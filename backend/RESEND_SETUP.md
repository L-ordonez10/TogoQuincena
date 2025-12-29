# Configuración de Resend para Envío de Emails

## Descripción

Este proyecto utiliza [Resend](https://resend.com) para enviar emails de confirmación cuando se crea una nueva solicitud de crédito.

## Configuración

### 1. Obtener una API Key de Resend

1. Ve a [https://resend.com](https://resend.com) y crea una cuenta
2. Una vez dentro del dashboard, ve a la sección "API Keys"
3. Crea una nueva API Key y cópiala

### 2. Configurar Variables de Entorno

Agrega las siguientes variables a tu archivo `.env`:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Nota:** 
- Reemplaza `re_your_api_key_here` con tu API key real de Resend
- Para usar un dominio personalizado, primero debes verificarlo en Resend y luego cambiar `RESEND_FROM_EMAIL` (ej: `noreply@tudominio.com`)
- Por defecto, puedes usar `onboarding@resend.dev` para pruebas

### 3. Verificar tu Dominio (Opcional, para Producción)

Para usar tu propio dominio en producción:

1. Ve a la sección "Domains" en Resend
2. Agrega tu dominio
3. Configura los registros DNS necesarios (SPF, DKIM, DMARC)
4. Una vez verificado, actualiza `RESEND_FROM_EMAIL` con tu email personalizado

## Funcionalidad Implementada

### Email de Confirmación de Solicitud

Cuando un usuario envía una solicitud (`POST /applications`), automáticamente se envía un email de confirmación que incluye:

- Nombre del solicitante
- Número de solicitud
- Mensaje de confirmación
- Diseño HTML profesional

### Template del Email

El email incluye:
- Header con branding de TogoQuincena
- Información personalizada del solicitante
- Número de solicitud para referencia
- Footer con copyright

## Manejo de Errores

Si el envío del email falla:
- La solicitud se crea exitosamente de todas formas
- El error se registra en los logs del servidor
- No afecta la respuesta al cliente

Esto asegura que problemas con el servicio de email no interrumpan el flujo principal de la aplicación.

## Testing

Para probar el envío de emails en desarrollo:

1. Asegúrate de tener configurada tu API key en `.env`
2. Crea una solicitud usando el endpoint POST `/applications`
3. Verifica en el dashboard de Resend que el email se haya enviado
4. Revisa tu bandeja de entrada

## Estructura de Archivos

```
src/
├── email/
│   ├── email.module.ts      # Módulo de email
│   └── email.service.ts     # Servicio con lógica de envío
└── application/
    ├── application.module.ts # Importa EmailModule
    └── application.service.ts # Usa EmailService
```

## Troubleshooting

### El email no se envía

- Verifica que `RESEND_API_KEY` esté correctamente configurada en `.env`
- Revisa los logs del servidor para ver errores específicos
- Verifica que tu API key tenga permisos de envío
- Comprueba los límites de tu plan en Resend

### Email en spam

- Configura correctamente los registros DNS (SPF, DKIM, DMARC)
- Usa un dominio verificado
- Evita contenido que pueda ser marcado como spam

### Rate Limiting

- Resend tiene límites de envío según tu plan
- El plan gratuito permite 100 emails/día
- Para más, considera actualizar tu plan
