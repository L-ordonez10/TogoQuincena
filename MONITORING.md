# Monitoring and Logging Guide

## 📊 Monitoring Tools Setup

### 1. Basic Monitoring with Docker Stats

```bash
# Watch real-time stats
docker stats

# Get snapshot
docker stats --no-stream

# Format output
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
```

### 2. Disk Usage Monitoring

```bash
# Check overall disk usage
df -h

# Check Docker disk usage
docker system df

# Check specific volumes
docker volume ls
docker volume inspect mysql_data
docker volume inspect uploads_data
```

### 3. Log Monitoring

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend

# Last N lines
docker-compose -f docker-compose.prod.yml logs --tail=100 backend

# Since timestamp
docker-compose -f docker-compose.prod.yml logs --since=1h backend

# Filter for errors
docker-compose -f docker-compose.prod.yml logs | grep -i error
```

## 📝 Nginx Logs Analysis

### Access Log Analysis

```bash
# Top 10 IPs
cat nginx/logs/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# Top 10 requested URLs
cat nginx/logs/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -10

# Request methods distribution
cat nginx/logs/access.log | awk '{print $6}' | sort | uniq -c

# Response status codes
cat nginx/logs/access.log | awk '{print $9}' | sort | uniq -c | sort -rn

# 4xx errors
cat nginx/logs/access.log | awk '$9 ~ /^4/ {print $7}' | sort | uniq -c | sort -rn

# 5xx errors
cat nginx/logs/access.log | awk '$9 ~ /^5/ {print $7}' | sort | uniq -c | sort -rn

# Requests per minute (last hour)
tail -1000 nginx/logs/access.log | awk '{print $4}' | cut -d: -f1,2 | uniq -c
```

### Error Log Analysis

```bash
# Recent errors
tail -100 nginx/logs/error.log

# Error types
cat nginx/logs/error.log | grep -oP '\[error\] \d+#\d+: \*\d+ \K[^,]+' | sort | uniq -c | sort -rn

# Find specific error
grep "502 Bad Gateway" nginx/logs/error.log
```

## 🔍 Application Logs

### Backend (NestJS) Logs

```bash
# View backend logs
docker logs togo-backend

# Follow logs
docker logs -f togo-backend

# Last 100 lines
docker logs --tail 100 togo-backend

# Since 1 hour ago
docker logs --since 1h togo-backend

# Filter errors
docker logs togo-backend 2>&1 | grep -i error

# Filter specific endpoint
docker logs togo-backend 2>&1 | grep "/applications"
```

### Frontend (Next.js) Logs

```bash
# View frontend logs
docker logs togo-frontend

# Follow logs
docker logs -f togo-frontend

# Filter warnings
docker logs togo-frontend 2>&1 | grep -i warn
```

### MySQL Logs

```bash
# View MySQL logs
docker logs togo-mysql

# Slow query log (if enabled)
docker exec togo-mysql cat /var/log/mysql/slow.log

# Error log
docker logs togo-mysql 2>&1 | grep -i error
```

## 📈 Performance Metrics

### MySQL Performance

```bash
# Connect to MySQL
docker exec -it togo-mysql mysql -u root -p

# Show process list
SHOW FULL PROCESSLIST;

# Show status
SHOW STATUS;

# Show variables
SHOW VARIABLES;

# Show table status
USE quincena_db;
SHOW TABLE STATUS;

# Check slow queries
SHOW VARIABLES LIKE 'slow_query%';
SHOW GLOBAL STATUS LIKE 'Slow_queries';

# Check connections
SHOW VARIABLES LIKE 'max_connections';
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Threads_running';

# Check buffer pool
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW STATUS LIKE 'Innodb_buffer_pool%';

# Check table sizes
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'quincena_db'
ORDER BY (data_length + index_length) DESC;
```

### Application Performance

```bash
# Response time monitoring
time curl -s https://yourdomain.com/api/health

# Load test with ab (Apache Bench)
ab -n 1000 -c 10 https://yourdomain.com/

# Monitor container resources during load
docker stats --no-stream
```

## 🚨 Alerting Setup

### 1. Simple Email Alerts with Cron

Create `/home/ubuntu/alert-check.sh`:

```bash
#!/bin/bash

ALERT_EMAIL="your-email@example.com"
LOG_FILE="/var/log/togo-alerts.log"

# Check if containers are running
CONTAINERS_DOWN=$(docker-compose -f /home/ubuntu/TogoQuincena/docker-compose.prod.yml ps | grep -c "Exit")

if [ $CONTAINERS_DOWN -gt 0 ]; then
    echo "$(date): Containers down detected" >> $LOG_FILE
    echo "Warning: $CONTAINERS_DOWN containers are down" | mail -s "TogoQuincena Alert" $ALERT_EMAIL
fi

# Check disk space
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date): High disk usage: $DISK_USAGE%" >> $LOG_FILE
    echo "Warning: Disk usage is at $DISK_USAGE%" | mail -s "TogoQuincena Disk Alert" $ALERT_EMAIL
fi

# Check for 5xx errors in Nginx
ERROR_COUNT=$(tail -100 /home/ubuntu/TogoQuincena/nginx/logs/access.log | grep -c ' 5[0-9][0-9] ')
if [ $ERROR_COUNT -gt 10 ]; then
    echo "$(date): High error rate: $ERROR_COUNT 5xx errors" >> $LOG_FILE
    echo "Warning: $ERROR_COUNT 5xx errors in last 100 requests" | mail -s "TogoQuincena Error Alert" $ALERT_EMAIL
fi
```

```bash
chmod +x /home/ubuntu/alert-check.sh

# Run every 5 minutes
crontab -e
# Add:
*/5 * * * * /home/ubuntu/alert-check.sh
```

### 2. Advanced Monitoring with Prometheus + Grafana

Create `docker-compose.monitoring.yml`:

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - app-network

  grafana:
    image: grafana/grafana
    container_name: grafana
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3030:3000"
    networks:
      - app-network

  node-exporter:
    image: prom/node-exporter
    container_name: node-exporter
    ports:
      - "9100:9100"
    networks:
      - app-network

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    container_name: cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - "8080:8080"
    networks:
      - app-network

networks:
  app-network:
    external: true

volumes:
  prometheus_data:
  grafana_data:
```

## 📊 Metrics Dashboard

### Create a simple status page

Create `status.sh`:

```bash
#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║   TogoQuincena Status Dashboard        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# System Info
echo "🖥️  System Resources:"
echo "   CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')% used"
echo "   Memory: $(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2}')"
echo "   Disk: $(df -h / | awk 'NR==2{print $5}')"
echo ""

# Docker Status
echo "🐳 Docker Services:"
docker-compose -f docker-compose.prod.yml ps --format "   {{.Service}}: {{.Status}}"
echo ""

# Nginx Stats
if [ -f nginx/logs/access.log ]; then
    echo "🌐 Nginx Stats (last hour):"
    REQUESTS=$(tail -10000 nginx/logs/access.log | wc -l)
    ERRORS=$(tail -10000 nginx/logs/access.log | grep -c ' 5[0-9][0-9] ')
    echo "   Requests: $REQUESTS"
    echo "   5xx Errors: $ERRORS"
fi
echo ""

# Database
echo "🗄️  Database:"
DB_SIZE=$(docker exec togo-mysql mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size' FROM information_schema.TABLES WHERE table_schema = 'quincena_db';" 2>/dev/null | tail -1)
echo "   Size: ${DB_SIZE} MB"
echo ""

echo "✅ Dashboard generated at $(date)"
```

## 🔔 Log Rotation

Create `/etc/logrotate.d/togo`:

```
/home/ubuntu/TogoQuincena/nginx/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        docker exec togo-nginx nginx -s reload > /dev/null 2>&1
    endscript
}
```

## 📱 Simple Uptime Monitoring

Use external services:
- **UptimeRobot** (free, 50 monitors)
- **Pingdom** (free tier available)
- **Healthchecks.io** (free tier available)

Configure endpoints to monitor:
- `https://yourdomain.com/health` (every 5 minutes)
- `https://yourdomain.com/api/health` (every 5 minutes)

## 🎯 Key Metrics to Monitor

### Critical
- ✅ Container uptime
- ✅ HTTP response codes (5xx errors)
- ✅ Disk space
- ✅ Database connections
- ✅ SSL certificate expiry

### Important
- ⚠️ Memory usage
- ⚠️ CPU usage
- ⚠️ Response time
- ⚠️ Request rate
- ⚠️ Database query time

### Nice to Have
- 📊 User activity
- 📊 API endpoint usage
- 📊 File uploads
- 📊 Error patterns
- 📊 Geographic distribution

---

**Pro Tip**: Run `./health-check.sh` daily to get a comprehensive health report!
