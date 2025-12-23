# QuincenaToGo - Frontend

Sistema de adelanto de quincena - Frontend Next.js con TypeScript y React Query.

## 🚀 Características

- ⚡ Next.js 14 con App Router
- 🎨 Tailwind CSS v4 para estilos
- 🔐 **Sistema de seguridad robusto**
- 📝 TypeScript para type safety
- 🔄 React Query para manejo de estado servidor
- 🎯 Validación de formularios con Zod
- 📱 Diseño responsive
- 🧩 Componentes UI con Radix UI
- 🔒 Autenticación y autorización

## 🔒 Seguridad

Este proyecto implementa múltiples capas de seguridad:

- **Headers HTTP**: X-Frame-Options, CSP, X-XSS-Protection
- **Sanitización de inputs**: Prevención de XSS
- **Validación de archivos**: Tipo MIME y tamaño
- **Rate limiting**: Protección contra abuso
- **Encriptación de IDs**: URLs seguras
- **Storage seguro**: Datos encriptados en localStorage
- **HTTPS obligatorio**: En producción

Ver [SECURITY.md](./SECURITY.md) para más detalles.

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Backend corriendo en el puerto configurado

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=your-api-key-here
NEXT_PUBLIC_ENCRYPTION_KEY=your-encryption-key-here
NEXT_PUBLIC_DASHBOARD_PASSWORD=tu_contraseña_segura_2025
```

⚠️ **IMPORTANTE**: 
- Nunca commitear el archivo `.env` con claves reales
- Cambiar `NEXT_PUBLIC_DASHBOARD_PASSWORD` por una contraseña fuerte
- El dashboard `/dashboard` está protegido por contraseña

## 🏃 Desarrollo

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build de Producción

```bash
npm run build
npm run start
```

## 📁 Estructura del Proyecto

```
frontend/
├── app/
│   ├── (main)/              # Rutas públicas
│   │   ├── (home)/          # Página principal
│   │   ├── solicita-adelanto/ # Formulario solicitud
│   │   ├── descubre-como/   # Información del proceso
│   │   └── cotizador/       # Calculadora
│   ├── dashboard/           # Rutas privadas
│   ├── components/          # Componentes reutilizables
│   │   └── ui/              # Componentes UI base
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades y helpers
│   │   ├── security/        # Módulo de seguridad
│   │   ├── constants/       # Constantes del sistema
│   │   └── types/           # Definiciones TypeScript
│   └── providers/           # Context providers
├── public/                  # Archivos estáticos
└── SECURITY.md             # Documentación de seguridad
```

## 🔐 Seguridad - Quick Start

### Protección de Dashboard
El dashboard `/dashboard` está protegido por contraseña:

```typescript
// Configurar en .env
NEXT_PUBLIC_DASHBOARD_PASSWORD=tu_contraseña_segura

// Acceder
http://localhost:3000/dashboard
// Ingresar contraseña configurada
```

Ver [DASHBOARD_PROTECTION.md](./DASHBOARD_PROTECTION.md) para más detalles.

### Validación de Inputs
```typescript
import { sanitizeInput, isValidEmail } from '@/lib/security';

const cleanInput = sanitizeInput(userInput);
const isValid = isValidEmail(email);
```

### Validación de Archivos
```typescript
import { validateFileType, validateFileSize } from '@/lib/security';

const isValidFile = validateFileType(file, ALLOWED_DOCUMENT_TYPES);
const isSizeOk = validateFileSize(file, MAX_FILE_SIZE_MB);
```

### Storage Seguro
```typescript
import { secureStorage } from '@/lib/secureStorage';

secureStorage.setItem('key', value, { expiresIn: 3600000 });
const data = secureStorage.getItem('key');
```

### Rate Limiting
```typescript
import { useSecureSubmit } from '@/hooks/useSecureSubmit';

const { handleSubmit, isSubmitting, error } = useSecureSubmit(
  submitFunction,
  'form-identifier'
);
```

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Auditoría de seguridad
npm audit

# Fix automático de vulnerabilidades
npm audit fix
```

## 📦 Tecnologías Principales

- **Next.js 14**: Framework React
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Estilos
- **Radix UI**: Componentes accesibles
- **React Query**: Estado del servidor
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas
- **Axios**: Cliente HTTP

## 🤝 Contribuir

1. Fork el proyecto
2. Crear branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Convenciones de Código

- TypeScript estricto
- ESLint configurado
- Componentes funcionales con hooks
- Naming: camelCase para variables, PascalCase para componentes
- Imports organizados por tipo

## 🔧 Troubleshooting

### Error: Cannot connect to API
- Verificar que el backend esté corriendo
- Verificar `NEXT_PUBLIC_API_URL` en `.env`
- Verificar `NEXT_PUBLIC_API_KEY` coincida con el backend

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run build 2>&1 | tee build.log
```

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Soporte

Para problemas o preguntas, contactar al equipo de desarrollo.
