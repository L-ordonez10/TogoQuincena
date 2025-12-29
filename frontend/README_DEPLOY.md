# Despliegue en Vercel — Instrucciones rápidas

Resumen rápido:
- No subas archivos `.env` al repositorio; usa las Environment Variables del dashboard de Vercel.
- Ya hay un archivo `.vercelignore` que excluye `.env` y artefactos locales.

Pasos para desplegar desde esta rama:

1. Asegúrate de que los cambios estén comiteados y pusheados:

```bash
git add .
git commit -m "Prepare frontend for deployment (ignore env, deploy docs)"
git push origin HEAD
```

2. Configura variables en Vercel (Dashboard):

- Ve a https://vercel.com → tu proyecto → Settings → Environment Variables.
- Añade las variables que tu app necesita, por ejemplo:
  - `NEXT_PUBLIC_API_URL` (URL pública del backend)
  - `NEXT_PUBLIC_ENCRYPTION_KEY` (clave usada por `encryptId`/`decryptId` si la necesita el cliente)
  - Variables privadas del backend (sin `NEXT_PUBLIC_`) si usas funciones server-side en Vercel

Define los valores para los entornos `Preview` y `Production` según corresponda.

3. Deploy con Vercel (opcional desde CLI):

```bash
# Instala Vercel CLI si no la tienes
pnpm add -g vercel

# Despliega (interactivo)
vercel --prod

# O añade una variable desde la CLI
vercel env add NEXT_PUBLIC_API_URL https://api.mi-backend.com production
```

4. Ver logs en caso de errores 500:

```bash
vercel logs <deployment-url-or-id> --since 1h
```

5. Si accidentalmente comiteaste `.env` antes, elimina del índice y vuelve a commitear (no reescribe historial):

```bash
git rm --cached .env
git commit -m "Remove .env from repo"
git push
```

6. Buenas prácticas:
- Prefiere variables `NEXT_PUBLIC_` sólo para valores que el cliente necesita.
- Mantén las claves secretas sólo en el dashboard de Vercel o en un secrets manager.
- Revisa `vercel.json` sólo si necesitas rutas personalizadas o configuración de builds.

Si quieres, puedo:
- revisar los logs del último deploy (necesito el deployment URL o ID),
- o añadir un pequeño script de sanity-test que haga `encryptId(123)` y `decryptId(...)` en el navegador para validar `NEXT_PUBLIC_ENCRYPTION_KEY`.
