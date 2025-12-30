#!/bin/bash

# Health check script for all services
# Usage: ./health-check.sh

echo "🏥 Health Check - TogoQuincena Services"
echo "========================================"
echo ""

# Load environment variables
if [ -f .env.prod ]; then
    export $(grep -v '^#' .env.prod | xargs)
else
    echo "⚠️  Warning: .env.prod file not found, using defaults"
    DOMAIN="localhost"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check container status
echo "📦 Container Status:"
echo "-------------------"
docker-compose -f docker-compose.prod.yml ps
echo ""

# Check MySQL health
echo "🗄️  MySQL Health:"
echo "----------------"
if docker exec togo-mysql mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD} 2>/dev/null | grep -q "mysqld is alive"; then
    echo "✅ MySQL is healthy"
else
    echo "❌ MySQL is not responding"
fi
echo ""

# Check disk space
echo "💾 Disk Space:"
echo "-------------"
df -h | grep -E "Filesystem|/$|/var/lib/docker"
echo ""

# Check memory usage
echo "🧠 Memory Usage:"
echo "---------------"
free -h
echo ""

# Check Docker resources
echo "🐳 Docker Container Resources:"
echo "-----------------------------"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
echo ""

# Check HTTP endpoints
echo "🌐 HTTP Endpoints:"
echo "-----------------"

# Check Nginx health
if curl -sf https://${DOMAIN}/health > /dev/null 2>&1 || curl -sf http://localhost/health > /dev/null 2>&1; then
    echo "✅ Nginx health check passed"
else
    echo "❌ Nginx health check failed"
fi

# Check backend API
if curl -sf https://${DOMAIN}/api/health > /dev/null 2>&1 || curl -sf http://localhost:80/api/health > /dev/null 2>&1; then
    echo "✅ Backend API is responding"
else
    echo "⚠️  Backend API health check failed (may need API key)"
fi

# Check frontend
if curl -sf https://${DOMAIN} > /dev/null 2>&1 || curl -sf http://localhost > /dev/null 2>&1; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi
echo ""

# Check SSL certificate expiry
echo "🔒 SSL Certificate:"
echo "------------------"
if [ -f nginx/ssl/fullchain.pem ]; then
    EXPIRY=$(openssl x509 -enddate -noout -in nginx/ssl/fullchain.pem | cut -d= -f2)
    echo "Certificate expires: $EXPIRY"
    
    # Calculate days until expiry
    EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$EXPIRY" +%s 2>/dev/null)
    NOW_EPOCH=$(date +%s)
    DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))
    
    if [ $DAYS_LEFT -lt 30 ]; then
        echo "⚠️  Certificate expires in $DAYS_LEFT days - renewal needed!"
    else
        echo "✅ Certificate valid for $DAYS_LEFT more days"
    fi
else
    echo "⚠️  SSL certificate not found"
fi
echo ""

# Check logs for errors
echo "📋 Recent Errors (last 10 minutes):"
echo "-----------------------------------"
ERROR_COUNT=$(docker-compose -f docker-compose.prod.yml logs --since 10m 2>&1 | grep -i error | wc -l)
if [ $ERROR_COUNT -gt 0 ]; then
    echo "⚠️  Found $ERROR_COUNT errors in logs"
    docker-compose -f docker-compose.prod.yml logs --since 10m 2>&1 | grep -i error | tail -5
else
    echo "✅ No errors in recent logs"
fi
echo ""

echo "========================================"
echo "Health check completed!"
echo ""
echo "💡 For detailed logs, run:"
echo "   docker-compose -f docker-compose.prod.yml logs -f"
