# Deployment Guide - TogoQuincena en AWS Lightsail

## 🚀 Pre-requisitos

1. **AWS Lightsail Instance** (recomendado: mínimo 2GB RAM, 1 vCPU)
2. **Dominio configurado** apuntando a tu IP de Lightsail
3. **Docker y Docker Compose** instalados en el servidor
4. **Git** instalado en el servidor

## 📋 Paso 1: Configuración del Servidor Lightsail

### 1.1 Conectarse al servidor
```bash
ssh ubuntu@your-lightsail-ip
```

### 1.2 Instalar Docker y Docker Compose
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación
docker --version
docker-compose --version
```

### 1.3 Configurar Firewall en Lightsail
En la consola de AWS Lightsail, abre los siguientes puertos:
- **80** (HTTP)
- **443** (HTTPS)
- **22** (SSH)

## 📋 Paso 2: Clonar y Configurar el Proyecto

### 2.1 Clonar repositorio
```bash
cd /home/ubuntu
git clone <your-repository-url> TogoQuincena
cd TogoQuincena
```

### 2.2 Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.production .env.prod

# Editar con valores reales
nano .env.prod
```

**IMPORTANTE**: Genera contraseñas fuertes:
```bash
# Generar contraseñas seguras
openssl rand -base64 32  # Para MYSQL_ROOT_PASSWORD
openssl rand -base64 32  # Para DB_PASSWORD
openssl rand -base64 48  # Para API_KEY
```

Configurar en `.env.prod`:
```bash
MYSQL_ROOT_PASSWORD=<generated-password-1>
DB_USERNAME=togo_user
DB_PASSWORD=<generated-password-2>
DB_DATABASE=quincena_db

API_KEY=<generated-api-key>
JWT_SECRET=<generated-jwt-secret-if-needed>

RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

FRONTEND_ORIGIN=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_API_KEY=<same-as-API_KEY>

DOMAIN=yourdomain.com
```

### 2.3 Configurar Nginx con tu dominio
```bash
# Editar configuración de Nginx
nano nginx/nginx.conf

# Reemplazar 'yourdomain.com' con tu dominio real en:
# - server_name yourdomain.com www.yourdomain.com;
# (Aparece 2 veces en el archivo)
```

## 📋 Paso 3: Configurar SSL/HTTPS con Let's Encrypt

### 3.1 Instalar Certbot
```bash
sudo apt install certbot -y
```

### 3.2 Generar certificados SSL
```bash
# Detener servicios si están corriendo
docker-compose -f docker-compose.prod.yml down

# Generar certificado
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Los certificados se guardan en:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### 3.3 Copiar certificados a nginx
```bash
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
sudo chown -R $USER:$USER nginx/ssl
```

### 3.4 Configurar renovación automática
```bash
# Crear script de renovación
sudo nano /etc/cron.monthly/renew-ssl.sh
```

Agregar:
```bash
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /home/ubuntu/TogoQuincena/nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /home/ubuntu/TogoQuincena/nginx/ssl/
docker exec togo-nginx nginx -s reload
```

```bash
sudo chmod +x /etc/cron.monthly/renew-ssl.sh
```

## 📋 Paso 4: Desplegar la Aplicación

### 4.1 Construir y levantar contenedores
```bash
# Desde el directorio del proyecto
cd /home/ubuntu/TogoQuincena

# Construir imágenes y levantar servicios
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 4.2 Verificar que todo está funcionando
```bash
# Ver estado de contenedores
docker-compose -f docker-compose.prod.yml ps

# Deberías ver 4 servicios corriendo:
# - togo-mysql
# - togo-backend
# - togo-frontend
# - togo-nginx

# Verificar logs
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs frontend
```

### 4.3 Probar la aplicación
```bash
# Desde tu máquina local o navegador
curl https://yourdomain.com/health  # Debería retornar "healthy"
curl https://yourdomain.com/api/health  # Probar backend
```

## 📋 Paso 5: Configuración de Base de Datos

### 5.1 Verificar conexión a MySQL
```bash
docker exec -it togo-mysql mysql -u root -p
# Ingresar MYSQL_ROOT_PASSWORD

# Verificar base de datos
SHOW DATABASES;
USE quincena_db;
SHOW TABLES;
```

### 5.2 Backup automático (opcional pero recomendado)
```bash
# Crear script de backup
mkdir -p /home/ubuntu/backups
nano /home/ubuntu/backup-db.sh
```

Agregar:
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
docker exec togo-mysql mysqldump -u root -p${MYSQL_ROOT_PASSWORD} quincena_db > $BACKUP_DIR/backup_$DATE.sql
# Mantener solo últimos 7 días
find $BACKUP_DIR -type f -mtime +7 -delete
```

```bash
chmod +x /home/ubuntu/backup-db.sh

# Agregar a crontab (diario a las 2am)
crontab -e
# Agregar línea:
0 2 * * * /home/ubuntu/backup-db.sh
```

## 📋 Paso 6: Monitoreo y Mantenimiento

### 6.1 Comandos útiles
```bash
# Ver logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Detener servicios
docker-compose -f docker-compose.prod.yml down

# Actualizar aplicación
git pull
docker-compose -f docker-compose.prod.yml up -d --build

# Limpiar recursos no utilizados
docker system prune -a --volumes
```

### 6.2 Monitoreo de recursos
```bash
# Ver uso de recursos
docker stats

# Ver espacio en disco
df -h

# Ver logs de Nginx
tail -f nginx/logs/access.log
tail -f nginx/logs/error.log
```

## 🔒 Seguridad Adicional

### 1. Configurar fail2ban (protección contra ataques)
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 2. Actualizar regularmente
```bash
# Crear script de actualización
nano /home/ubuntu/update-system.sh
```

Agregar:
```bash
#!/bin/bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
docker system prune -f
```

```bash
chmod +x /home/ubuntu/update-system.sh

# Ejecutar mensualmente
sudo crontab -e
# Agregar:
0 3 1 * * /home/ubuntu/update-system.sh
```

## 📊 Estructura de URLs

Una vez desplegado:
- **Frontend**: `https://yourdomain.com`
- **Backend API**: `https://yourdomain.com/api/`
- **Health Check**: `https://yourdomain.com/health`

Ejemplo de llamadas API desde el frontend:
```javascript
// El frontend automáticamente usa NEXT_PUBLIC_API_URL
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  }
});
// URL real: https://yourdomain.com/api/applications
```

## 🆘 Troubleshooting

### Problema: Contenedor no inicia
```bash
docker-compose -f docker-compose.prod.yml logs <service-name>
```

### Problema: No se puede conectar a MySQL
```bash
# Verificar que el contenedor MySQL esté healthy
docker-compose -f docker-compose.prod.yml ps
# Esperar a que el healthcheck pase
```

### Problema: Error 502 Bad Gateway
```bash
# Verificar que backend/frontend estén corriendo
docker-compose -f docker-compose.prod.yml ps
# Revisar logs de nginx
docker logs togo-nginx
```

### Problema: Certificado SSL no funciona
```bash
# Verificar que los archivos existen
ls -la nginx/ssl/
# Recrear certificados si es necesario
sudo certbot certonly --standalone -d yourdomain.com --force-renew
```

## 📝 Notas Importantes

1. **NUNCA** commitear `.env.prod` al repositorio
2. **Cambiar** todas las contraseñas predeterminadas
3. **Hacer backups** regulares de la base de datos
4. **Monitorear** logs regularmente
5. **Actualizar** Docker images y sistema operativo mensualmente
6. **Revisar** logs de Nginx para detectar intentos de ataque

## 🎉 ¡Listo!

Tu aplicación debería estar corriendo en:
- **https://yourdomain.com** (Frontend)
- **https://yourdomain.com/api** (Backend API)

¡Felicitaciones por el despliegue! 🚀
