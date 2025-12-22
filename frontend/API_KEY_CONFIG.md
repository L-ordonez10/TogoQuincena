# Configuración de API Key en el Frontend

## ✅ Cambios Realizados

### 1. Variables de Entorno
Se añadió la API Key en:
- `.env.local` (desarrollo)
- `.env` (configuración base)

```env
NEXT_PUBLIC_API_KEY=eTU9U0QahcOAqN3tlMTNuz3+XbtwR5XlwbROlvAn01c=
```

### 2. Interceptor de Axios
El archivo `app/lib/axios.ts` ahora incluye automáticamente el header `x-api-key` en todas las peticiones:

```typescript
axiosInstance.interceptors.request.use((config) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey && config.headers) {
    config.headers["x-api-key"] = apiKey;
  }
  return config;
});
```

## 🔒 Seguridad

**Importante:** La API Key está configurada en variables de entorno con prefijo `NEXT_PUBLIC_` lo que significa que:
- ✅ Se incluye en el bundle del cliente (necesario para llamadas desde el navegador)
- ⚠️ Es visible en el código del navegador
- 🔐 Solo debe usarse en producción con HTTPS
- 🔄 Rota la clave periódicamente

## 🚀 Uso

No necesitas hacer nada más. Todos los hooks ya funcionarán con la API Key:

```typescript
// ✅ Automáticamente incluye x-api-key
const { data } = useSolicitudes();

// ✅ Automáticamente incluye x-api-key  
const mutation = useCreateApplication();

// ✅ Automáticamente incluye x-api-key
const upload = useFileUpload();
```

## 🧪 Prueba

Para verificar que funciona:

1. Inicia el backend: `cd backend && npm run start:dev`
2. Inicia el frontend: `cd frontend && npm run dev`
3. Intenta acceder a cualquier ruta del dashboard
4. Las peticiones deben completarse exitosamente con status 200

Si falla, verifica:
- ✅ Backend tiene la variable `API_KEY` en `.env`
- ✅ Frontend tiene `NEXT_PUBLIC_API_KEY` en `.env.local`
- ✅ Ambas claves son idénticas
- ✅ Reiniciaste ambos servidores después de cambiar variables de entorno
