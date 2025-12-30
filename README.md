# TogoQuincena - Aplicación de Préstamos

Sistema de gestión de solicitudes de préstamos quincenal construido con NestJS, Next.js, MySQL y Docker.

## 🚀 Deployment en Producción

Para desplegar esta aplicación en AWS Lightsail con Nginx como reverse proxy, consulta la guía completa:

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía paso a paso de deployment
🔒 **[SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md)** - Checklist de seguridad

## 📋 Arquitectura

```
┌─────────────┐
│   Nginx     │  Puerto 80/443 (HTTPS)
│  (Reverse   │  
│   Proxy)    │
└──────┬──────┘
       │
       ├─────────────► /     ──► Frontend (Next.js)
       │                         Puerto 3000
       │
       └─────────────► /api  ──► Backend (NestJS)
                                 Puerto 3001
                                      │
                                      ▼
                                  MySQL 8.0
                                  Puerto 3306 (interno)
```

## 🛠️ Stack Tecnológico

- **Backend**: NestJS + TypeORM
- **Frontend**: Next.js 14 + React
- **Base de Datos**: MySQL 8.0
- **Reverse Proxy**: Nginx
- **Containerización**: Docker + Docker Compose
- **SSL**: Let's Encrypt (Certbot)

## 📦 Desarrollo Local

### Requisitos
- Node.js 20+
- pnpm
- Docker y Docker Compose

### Setup
```bash
# Instalar dependencias backend
cd backend
pnpm install

# Instalar dependencias frontend
cd ../frontend
pnpm install

# Copiar archivos de configuración
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Levantar servicios en desarrollo
docker-compose up -d
```

### URLs en desarrollo
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: localhost:3306

## 🚀 Producción

### Quick Start
```bash
# 1. Configurar variables de entorno
cp .env.production .env.prod
nano .env.prod  # Editar con valores reales

# 2. Configurar SSL
./setup-ssl.sh

# 3. Desplegar
./deploy.sh
```

### Comandos útiles
```bash
# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Detener servicios
docker-compose -f docker-compose.prod.yml down

# Backup de base de datos
docker exec togo-mysql mysqldump -u root -p quincena_db > backup.sql
```

## 🔒 Seguridad

### Features implementadas:
- ✅ HTTPS con Let's Encrypt
- ✅ API Key authentication
- ✅ Rate limiting (Nginx + NestJS)
- ✅ Security headers (HSTS, XSS Protection, etc.)
- ✅ MySQL con usuario no-root
- ✅ CORS configurado
- ✅ Input validation
- ✅ File upload validation
- ✅ Docker non-root users

### Variables de entorno sensibles:
```bash
# Generar contraseñas seguras
openssl rand -base64 32  # MySQL passwords
openssl rand -base64 48  # API Key
openssl rand -base64 64  # JWT Secret
```

## 📁 Estructura del Proyecto

```
TogoQuincena/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── application/    # Módulo de aplicaciones
│   │   ├── file-upload/    # Módulo de subida de archivos
│   │   ├── email/          # Módulo de emails
│   │   └── common/         # Guards, interceptors, etc.
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/               # Next.js App
│   ├── app/
│   ├── components/
│   ├── Dockerfile
│   └── .env.example
│
├── nginx/                  # Configuración Nginx
│   ├── nginx.conf
│   ├── ssl/               # Certificados SSL
│   └── logs/              # Logs de Nginx
│
├── mysql-init/            # Scripts de inicialización MySQL
│   └── 01-init.sql
│
├── docker-compose.yml      # Desarrollo
├── docker-compose.prod.yml # Producción
├── .env.production         # Template de variables
├── deploy.sh              # Script de deployment
├── setup-ssl.sh           # Setup SSL automático
├── DEPLOYMENT.md          # Guía de deployment
└── SECURITY_CHECKLIST.md  # Checklist de seguridad
```

## 🌐 Configuración de Dominios

En producción con Nginx:
- `https://tudominio.com` → Frontend
- `https://tudominio.com/api` → Backend API
- `https://tudominio.com/health` → Health check

El prefijo `/api` se elimina automáticamente antes de pasar al backend:
```
Request:  https://tudominio.com/api/applications
Proxied:  http://backend:3001/applications
```

## 📊 Monitoreo

### Health Checks
```bash
# Nginx health check
curl https://tudominio.com/health

# Backend health
curl https://tudominio.com/api/health

# Ver estado de contenedores
docker-compose -f docker-compose.prod.yml ps
```

### Logs
```bash
# Nginx access log
tail -f nginx/logs/access.log

# Nginx error log
tail -f nginx/logs/error.log

# Backend logs
docker-compose -f docker-compose.prod.yml logs backend

# Frontend logs
docker-compose -f docker-compose.prod.yml logs frontend
```

## 🔧 Mantenimiento

### Backups
```bash
# Backup manual de MySQL
docker exec togo-mysql mysqldump -u root -p${MYSQL_ROOT_PASSWORD} quincena_db > backup_$(date +%Y%m%d).sql

# Backup de archivos subidos
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

### Actualizaciones
```bash
# Actualizar aplicación
git pull
docker-compose -f docker-compose.prod.yml up -d --build

# Limpiar recursos no utilizados
docker system prune -a --volumes
```

### Renovación SSL
```bash
# Manual
sudo certbot renew

# Automático (ya configurado en deployment)
# Se ejecuta mensualmente via cron
```

## 🆘 Troubleshooting

### Error 502 Bad Gateway
```bash
# Verificar que todos los servicios estén corriendo
docker-compose -f docker-compose.prod.yml ps

# Ver logs
docker-compose -f docker-compose.prod.yml logs backend frontend
```

### Base de datos no conecta
```bash
# Verificar MySQL health
docker exec togo-mysql mysqladmin ping -h localhost -u root -p

# Verificar logs de MySQL
docker logs togo-mysql
```

### SSL no funciona
```bash
# Verificar certificados
ls -la nginx/ssl/

# Regenerar certificados
sudo certbot certonly --standalone -d tudominio.com --force-renew
```

## 📚 Recursos

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com)

## 📄 Licencia

[Especificar licencia]

## 👥 Contribuidores

[Lista de contribuidores]

---

**⚠️ IMPORTANTE**: Antes de desplegar en producción:
1. ✅ Leer [DEPLOYMENT.md](./DEPLOYMENT.md)
2. ✅ Completar [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md)
3. ✅ Generar contraseñas fuertes
4. ✅ Configurar SSL/HTTPS
5. ✅ Configurar backups automáticos
6. ✅ Nunca commitear archivos `.env.prod`
