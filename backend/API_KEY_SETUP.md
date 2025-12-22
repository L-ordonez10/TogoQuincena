# Protección de Rutas con API Key

Este backend implementa un sistema de autenticación simple pero seguro usando API Keys para proteger todas las rutas del dashboard.

## Configuración

### 1. Variables de Entorno

Agrega la siguiente variable en tu archivo `.env`:

```env
API_KEY=eTU9U0QahcOAqN3tlMTNuz3+XbtwR5XlwbROlvAn01c=
```

**⚠️ IMPORTANTE:** Cambia este valor en producción. Genera una nueva clave segura con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Uso en el Frontend

Para acceder a las rutas protegidas, el frontend debe incluir el header `x-api-key`:

```javascript
// Ejemplo con fetch
fetch('http://localhost:3001/applications', {
  headers: {
    'x-api-key': 'eTU9U0QahcOAqN3tlMTNuz3+XbtwR5XlwbROlvAn01c='
  }
});

// Ejemplo con axios
axios.get('http://localhost:3001/applications', {
  headers: {
    'x-api-key': 'eTU9U0QahcOAqN3tlMTNuz3+XbtwR5XlwbROlvAn01c='
  }
});
```

### 3. Rutas Públicas

Para hacer una ruta pública (sin requerir API key), usa el decorador `@Public()`:

```typescript
import { Public } from './common/decorators';

@Controller('public')
export class PublicController {
  @Public()
  @Get()
  getPublicData() {
    return { message: 'Esta ruta es pública' };
  }
}
```

## Arquitectura

- **Guard Global**: `ApiKeyGuard` se aplica automáticamente a todas las rutas
- **Decorador @Public()**: Permite marcar rutas específicas como públicas
- **Configuración Centralizada**: La API key se gestiona desde variables de entorno

## Seguridad

✅ **Ventajas:**
- No requiere base de datos de usuarios
- Simple de implementar y mantener
- Protección inmediata de todas las rutas
- Fácil rotación de claves

⚠️ **Consideraciones:**
- La API key debe transmitirse por HTTPS en producción
- Rotar la clave periódicamente
- No commitear la clave real al repositorio
- Usar variables de entorno diferentes por ambiente

## Estado Actual

- ✅ Guard configurado globalmente
- ✅ Ruta principal `/` marcada como pública
- ✅ Todas las rutas `/applications/*` requieren API key
- ✅ Respuesta 401 Unauthorized si la clave es inválida o falta
