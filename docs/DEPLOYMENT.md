# Deploy en Vercel

## Requisitos

- Repo conectado: `Jhonhb16/poli-lanzamiento`.
- Proyecto Supabase creado.
- URLs reales de WhatsApp para VIP y Comunidad.
- Logo publicado en una URL accesible, si se usara logo externo.

## Configuracion Vercel

1. En Vercel, selecciona **Add New Project**.
2. Importa `Jhonhb16/poli-lanzamiento`.
3. Usa la configuracion por defecto de Vite:
   - Framework preset: `Vite`.
   - Install command: `npm install`.
   - Build command: `npm run build`.
   - Output directory: `dist`.
4. Agrega variables de entorno en **Project Settings > Environment Variables**:
   - `VITE_SUPABASE_URL`: URL del proyecto Supabase.
   - `VITE_SUPABASE_ANON_KEY`: anon public key de Supabase.
   - `VITE_VIP_GROUP_URL`: link real del grupo VIP de WhatsApp.
   - `VITE_COMMUNITY_GROUP_URL`: link real del grupo Comunidad de WhatsApp.
   - `VITE_LOGO_URL`: URL del logo, opcional.
   - `VITE_GTM_ID`: ID de Google Tag Manager, opcional.
   - `VITE_META_PIXEL_ID`: ID de Meta Pixel, opcional.
5. Haz deploy.

## Verificacion post-deploy

- Abre `/` y completa un lead VIP.
- Abre `/` con UTMs: `?utm_source=meta&utm_medium=paid&utm_campaign=test`.
- Confirma redireccion a `/gracias-vip` o `/gracias-comunidad`.
- Confirma que los botones de WhatsApp abren los grupos reales.
- Confirma que el lead aparece en Supabase con score, clasificacion y UTMs.

## Notas

- `vercel.json` ya incluye rewrite a `index.html` para soportar rutas SPA.
- No pongas claves secretas de Supabase en variables `VITE_*`; solo la anon public key.
