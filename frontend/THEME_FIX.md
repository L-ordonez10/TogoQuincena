# 🔧 Fix: THEME Constants Error

## ❌ Problema
Error: `THEME is not defined` o `Cannot find module '@/lib/constants'`

## ✅ Solución Aplicada

### 1. Reorganización de Archivos
Se movió de:
```
app/lib/constants.ts  ❌ (archivo único)
```

A:
```
app/lib/constants/    ✅ (directorio)
├── index.ts          # Export central
├── theme.ts          # THEME constant
├── metadata.ts       # Metadata
└── api.ts            # API constants
```

### 2. Estructura de Exports

**app/lib/constants/index.ts:**
```typescript
export * from "./theme";      // THEME
export * from "./metadata";   // defaultMetadata
export * from "./api";        // API_URL, buildUrl
```

**app/lib/constants/theme.ts:**
```typescript
export const THEME = {
  colors: {
    black: "#000000",
    green: "#97d22a",
    blue: "#017eff",
    gray: "#dedede",
    white: "#ffffff",
    grayBackground: "rgba(222, 222, 222, 0.14)",
    blueBackground: "rgba(1, 126, 255, 0.08)",
  },
  shadows: {
    default: "0px 4px 4px 0px #00000040",
    card: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
} as const;
```

### 3. Importaciones Correctas

Todos los archivos deben importar desde el mismo lugar:

```typescript
// ✅ CORRECTO
import { THEME } from "@/lib/constants";
import { defaultMetadata } from "@/lib/constants";
import { API_URL, buildUrl } from "@/lib/constants";

// ❌ INCORRECTO
import { THEME } from "@/lib/constants.ts";
import { THEME } from "@/lib/constants/theme";
```

### 4. Archivos Actualizados

```
✅ app/layout.tsx                    # +defaultMetadata
✅ app/(main)/layout.tsx             # +defaultMetadata
✅ app/dashboard/layout.tsx          # +THEME import
✅ app/dashboard/components/DashboardGuard.tsx  # +THEME
✅ app/lib/constants/index.ts        # Updated exports
```

## 🧪 Verificación

### Paso 1: Verificar Estructura
```bash
# Debe existir el directorio
ls app/lib/constants/

# Debe contener:
# - index.ts
# - theme.ts
# - metadata.ts
# - api.ts
```

### Paso 2: Verificar Imports
```bash
# Buscar todos los imports
grep -r "from \"@/lib/constants\"" app/

# Todos deben ser consistentes
```

### Paso 3: Reiniciar Servidor
```bash
# Detener
Ctrl + C

# Limpiar cache (opcional)
rm -rf .next

# Reiniciar
npm run dev
```

## 📝 Uso Correcto

### Importar THEME
```typescript
import { THEME } from "@/lib/constants";

const { colors } = THEME;

// Usar
<div style={{ backgroundColor: colors.green }}>
  <p style={{ color: colors.black }}>Texto</p>
</div>
```

### Importar Metadata
```typescript
import { defaultMetadata } from "@/lib/constants";

export const metadata: Metadata = defaultMetadata;
```

### Importar API Utils
```typescript
import { API_URL, buildUrl } from "@/lib/constants";

const url = buildUrl("/path");
```

## 🚨 Errores Comunes

### Error: "Module not found"
```bash
# Causa: Cache de Next.js
# Solución:
rm -rf .next
npm run dev
```

### Error: "THEME is not defined"
```bash
# Causa: Import incorrecto
# Verificar:
import { THEME } from "@/lib/constants";  // ✅
import { THEME } from "@/lib/constants.ts"; // ❌
```

### Error: "Cannot read property 'colors'"
```bash
# Causa: THEME no exportado correctamente
# Verificar app/lib/constants/index.ts tiene:
export * from "./theme";
```

## ✅ Checklist de Verificación

- [ ] Directorio `app/lib/constants/` existe
- [ ] Archivo `app/lib/constants/index.ts` exporta todo
- [ ] Archivo `app/lib/constants/theme.ts` exporta THEME
- [ ] Archivo `app/lib/constants.ts` viejo eliminado
- [ ] Cache `.next` limpiado
- [ ] Servidor reiniciado
- [ ] Imports usan `@/lib/constants` (sin .ts)

## 🎯 Estado Final

```
app/lib/
├── constants/           ✅
│   ├── index.ts         ✅ (export central)
│   ├── theme.ts         ✅ (THEME)
│   ├── metadata.ts      ✅ (defaultMetadata)
│   └── api.ts           ✅ (API_URL, buildUrl)
├── constants.ts         ❌ (eliminado)
├── axios.ts             ✅
├── encryption.ts        ✅
└── ...
```

## 📚 Exportaciones Disponibles

Desde `@/lib/constants`:

```typescript
// Theme
THEME.colors.black
THEME.colors.green
THEME.colors.blue
THEME.colors.gray
THEME.colors.white
THEME.colors.grayBackground
THEME.colors.blueBackground
THEME.shadows.default
THEME.shadows.card

// Metadata
defaultMetadata.title
defaultMetadata.description
APP_NAME
APP_DESCRIPTION

// API
API_URL
API_URL_CONFIGURED
buildUrl(path: string)
```

## 🔄 Si Persiste el Error

1. **Limpiar completamente:**
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

2. **Verificar TypeScript:**
```bash
npx tsc --noEmit
```

3. **Verificar paths en tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["app/*"]
    }
  }
}
```

4. **Reiniciar VSCode:**
```bash
# Cerrar VSCode completamente
# Abrir de nuevo
```

---

**Error resuelto: THEME constants ahora disponibles desde `@/lib/constants`** ✅
