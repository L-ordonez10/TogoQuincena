# Security Checklist - Production Deployment

## ✅ Pre-Deployment Security Checklist

### 1. Environment Variables
- [ ] Todas las contraseñas son fuertes (min 32 caracteres)
- [ ] API_KEY es único y seguro (min 48 caracteres)
- [ ] No hay credenciales hardcodeadas en el código
- [ ] Archivo `.env.prod` NO está en git
- [ ] Variables de entorno están configuradas correctamente

### 2. Database Security
- [ ] Root password es fuerte y único
- [ ] Usuario de aplicación tiene permisos limitados (no es root)
- [ ] MySQL no está expuesto públicamente (solo en red interna)
- [ ] Backups automáticos configurados
- [ ] Conexiones encriptadas (si es posible)

### 3. SSL/HTTPS
- [ ] Certificado SSL instalado y válido
- [ ] HTTP redirige a HTTPS
- [ ] HSTS header habilitado
- [ ] Renovación automática de certificados configurada

### 4. Nginx Configuration
- [ ] Rate limiting configurado
- [ ] Security headers habilitados
- [ ] Client body size limitado
- [ ] Timeout configurados apropiadamente
- [ ] Logs habilitados

### 5. Docker Security
- [ ] Imágenes actualizadas
- [ ] No se ejecuta como root (donde sea posible)
- [ ] Volúmenes persistentes para datos importantes
- [ ] Redes internas para servicios no públicos
- [ ] Health checks configurados

### 6. Application Security
- [ ] CORS configurado correctamente
- [ ] API Key guard habilitado
- [ ] Rate limiting en aplicación
- [ ] Validación de inputs
- [ ] File upload limitado y validado

### 7. Server Security
- [ ] Firewall configurado (solo puertos 80, 443, 22)
- [ ] SSH con clave pública (no password)
- [ ] Fail2ban instalado y configurado
- [ ] Actualizaciones automáticas habilitadas
- [ ] Monitoreo de logs configurado

### 8. Backup & Recovery
- [ ] Backup automático de base de datos
- [ ] Backup de archivos subidos
- [ ] Procedimiento de recuperación documentado
- [ ] Backups probados

## 🔒 Mejoras de Seguridad Recomendadas

### Nivel 1 (Esencial)
1. **API Key Rotation**: Cambiar API keys regularmente
2. **Database Encryption**: Encriptar datos sensibles en la DB
3. **Audit Logging**: Log de todas las acciones importantes
4. **Input Validation**: Validar estrictamente todos los inputs

### Nivel 2 (Avanzado)
1. **WAF (Web Application Firewall)**: Cloudflare o AWS WAF
2. **2FA**: Autenticación de dos factores para admin
3. **Intrusion Detection**: Configurar IDS/IPS
4. **Security Scanning**: Scan regular de vulnerabilidades

### Nivel 3 (Empresarial)
1. **DDoS Protection**: Cloudflare Pro
2. **Penetration Testing**: Tests de penetración periódicos
3. **Compliance**: GDPR, ISO 27001, etc.
4. **Security Team**: Equipo dedicado de seguridad

## 🚨 Checklist Post-Deployment

### Inmediatamente después del deployment
- [ ] Verificar que HTTPS funciona correctamente
- [ ] Probar todas las rutas principales
- [ ] Verificar logs de errores
- [ ] Probar conexión a base de datos
- [ ] Verificar que archivos se suben correctamente
- [ ] Probar rate limiting

### Primera semana
- [ ] Monitorear logs diariamente
- [ ] Revisar uso de recursos (CPU, RAM, Disco)
- [ ] Verificar backups automáticos
- [ ] Probar procedimiento de recuperación
- [ ] Revisar logs de nginx para patrones anómalos

### Primer mes
- [ ] Revisar y ajustar rate limits
- [ ] Optimizar queries de base de datos
- [ ] Limpiar logs antiguos
- [ ] Actualizar dependencias
- [ ] Revisar alertas de seguridad

## 📋 Security Headers Explained

```nginx
# Previene clickjacking
X-Frame-Options: SAMEORIGIN

# Previene MIME type sniffing
X-Content-Type-Options: nosniff

# XSS Protection
X-XSS-Protection: 1; mode=block

# HTTPS Strict Transport Security
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Referrer Policy
Referrer-Policy: no-referrer-when-downgrade
```

## 🔐 Password Strength Requirements

```bash
# Generar contraseñas seguras:

# MySQL Root Password (32+ caracteres)
openssl rand -base64 32

# DB User Password (32+ caracteres)
openssl rand -base64 32

# API Key (48+ caracteres)
openssl rand -base64 48

# JWT Secret (64+ caracteres)
openssl rand -base64 64
```

## 🛡️ Common Security Vulnerabilities to Avoid

1. **SQL Injection**: Usar ORM (TypeORM) con parametrized queries
2. **XSS**: Sanitizar inputs, usar CSP headers
3. **CSRF**: Usar tokens CSRF, verificar origin
4. **Path Traversal**: Validar file paths
5. **File Upload**: Validar tipo, tamaño, sanitizar nombres
6. **Information Disclosure**: No exponer stack traces en producción
7. **Broken Authentication**: Usar JWT, bcrypt, rate limiting
8. **Sensitive Data Exposure**: Encriptar datos sensibles

## 📞 Incident Response Plan

### Si detectas un ataque:

1. **Inmediato**
   - Detener servicios si es necesario
   - Bloquear IPs maliciosas en firewall
   - Revisar logs para entender el ataque

2. **Corto plazo**
   - Cambiar todas las credenciales
   - Restaurar desde backup si es necesario
   - Parchear vulnerabilidad explotada

3. **Largo plazo**
   - Documentar incidente
   - Mejorar medidas de seguridad
   - Implementar monitoreo adicional
   - Notificar usuarios si hubo compromiso de datos

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/authentication)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [MySQL Security Best Practices](https://dev.mysql.com/doc/refman/8.0/en/security-guidelines.html)

## 🎯 Quick Security Audit Commands

```bash
# Check open ports
sudo netstat -tulpn

# Check running processes
ps aux | grep -E 'mysql|node|nginx'

# Check disk usage
df -h

# Check memory usage
free -h

# Check failed login attempts
sudo grep "Failed password" /var/log/auth.log

# Check nginx access for suspicious activity
tail -n 1000 nginx/logs/access.log | grep -E "(\.\./|<script|sql|union|select)"

# Check Docker container security
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

---

**Remember**: Security is not a one-time task, it's an ongoing process! 🔒
