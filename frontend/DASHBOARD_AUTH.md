# Protección de Rutas con Contraseña - Dashboard

## 🔒 Implementación Completada

### Características
- ✅ Protección por contraseña sin backend de usuarios
- ✅ Cookie segura con expiración de 7 días
- ✅ Límite de intentos (5 máximo)
- ✅ Interfaz amigable de autenticación
- ✅ Bloqueo de indexación en Google

## 📝 Configuración

### 1. Variable de Entorno
Agrega esta línea a tu archivo `.env`:

```env
NEXT_PUBLIC_DASHBOARD_PASSWORD=tu_contraseña_super_segura_2025
```

**IMPORTANTE:** 
- ⚠️ Cambia `tu_contraseña_super_segura_2025` por una contraseña fuerte
- 🔐 Nunca commitear el archivo `.env` con contraseñas reales
- 🔄 Compartir la contraseña de forma segura con el equipo

### 2. Contraseña por Defecto
Si no configuras la variable de entorno, la contraseña por defecto es: `changeme2025`

**NUNCA USAR EN PRODUCCIÓN**

## 🚀 Uso

### Acceder al Dashboard
1. Ir a: `http://localhost:3000/dashboard`
2. Ingresar la contraseña configurada
3. La autenticación dura 7 días
4. Después de 5 intentos fallidos, se bloquea temporalmente

### Cerrar Sesión
```typescript
import { authService } from "@/lib/auth";

// En cualquier componente
authService.logout();
```

## 🔍 Protección contra Google

### robots.txt
Creado en `/public/robots.txt`:
- ✅ Bloquea `/dashboard` y `/dashboard/*`
- ✅ Permite páginas públicas
- ✅ Bloquea todas las APIs

### Meta Tags
El dashboard incluye:
```html
<meta name="robots" content="noindex, nofollow">
<meta name="googlebot" content="noindex, nofollow">
```

### Verificar Indexación
1. Buscar en Google: `site:tudominio.com/dashboard`
2. No debería aparecer ningún resultado
3. Puede tardar unos días en aplicarse

## 🛡️ Seguridad Implementada

### Cookies Seguras
```typescript
- SameSite: Strict     // Protección CSRF
- Secure: true         // Solo HTTPS en producción
- HttpOnly: false      // JavaScript puede leer (necesario para client-side)
- Expires: 7 días      // Expira automáticamente
```

### Rate Limiting
- Máximo 5 intentos de contraseña
- Bloqueo temporal después de 5 intentos
- Se resetea al recargar la página

### Validación
- Contraseña verificada antes de acceder
- Cookie verificada en cada carga
- Redirección automática si no autenticado

## 📋 Archivos Creados

```
app/
├── lib/
│   └── auth/
│       ├── simpleAuth.ts      # Lógica de autenticación
│       └── index.ts           # Export central
├── dashboard/
│   └── components/
│       └── DashboardGuard.tsx # Componente de protección
public/
└── robots.txt                 # Bloqueo de indexación
```

## 🔧 Personalización

### Cambiar Duración de Sesión
En `app/lib/auth/simpleAuth.ts`:
```typescript
const AUTH_EXPIRY_DAYS = 7; // Cambiar a los días deseados
```

### Cambiar Límite de Intentos
En `app/dashboard/components/DashboardGuard.tsx`:
```typescript
if (attempts >= 5) { // Cambiar 5 por el límite deseado
```

### Deshabilitar Protección (Desarrollo)
Comentar el wrapper en `dashboard/layout.tsx`:
```typescript
// return <DashboardGuard>{children}</DashboardGuard>
return <>{children}</>
```

## 🎯 Ventajas de este Enfoque

✅ **Sin Backend de Usuarios**
- No necesitas base de datos de usuarios
- No hay gestión de cuentas
- Simple y directo

✅ **Compartible**
- Una sola contraseña para el equipo
- Fácil de cambiar si se compromete
- Sin proceso de registro

✅ **Seguro**
- Cookie con SameSite y Secure
- Rate limiting básico
- Oculto de buscadores

✅ **User-Friendly**
- Interfaz limpia
- Remember me automático (7 días)
- Feedback visual

## ⚠️ Limitaciones

❌ **No es para múltiples usuarios**
- Todos usan la misma contraseña
- No hay roles o permisos
- No hay audit log de quién accede

❌ **Seguridad básica**
- Protección en cliente (puede bypassearse con herramientas)
- No hay 2FA
- No hay recuperación de contraseña

❌ **No escalable**
- Para equipos grandes, considera un sistema de usuarios real
- Para datos sensibles, considera autenticación más robusta

## 🔄 Mejoras Futuras

Si necesitas más seguridad, considera:
1. Implementar backend de autenticación (NextAuth.js)
2. Usar servicios como Auth0 o Clerk
3. Implementar 2FA
4. Logs de acceso
5. IP whitelisting

## 📱 Testing

### Local
```bash
1. npm run dev
2. Ir a http://localhost:3000/dashboard
3. Probar con contraseña correcta
4. Probar con contraseña incorrecta (5 veces)
5. Verificar que la sesión persiste al recargar
```

### Producción
```bash
1. Verificar HTTPS está activo
2. Verificar cookies Secure funcionan
3. Probar en modo incógnito
4. Verificar Google no indexa: site:tudominio.com/dashboard
```

## 🤝 Compartir Contraseña

### Forma Segura
1. Usar gestor de contraseñas del equipo (1Password, LastPass)
2. Compartir en persona o llamada
3. Usar mensajes que se autodestruyen (Telegram, Signal)

### ❌ NO Hacer
- No enviar por email sin encriptar
- No enviar por Slack/WhatsApp
- No escribir en documentos compartidos
- No dejar en post-its 😅

## 🆘 Soporte

Si olvidaste la contraseña:
1. Verificar archivo `.env`
2. O usar la contraseña por defecto: `changeme2025`
3. O contactar al administrador del sistema
