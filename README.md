# Korean Lash Business Funnel

Aplicación de captación para el Workshop Korean Lash Business. Incluye formulario multi-step, scoring, clasificación VIP/COMUNIDAD, captura UTM, guardado en Supabase y páginas de gracias con cuenta regresiva.

## Stack

- Vite
- TailwindCSS
- JavaScript
- Supabase
- Vercel

## Setup local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configura las variables necesarias en `.env.local`. Para una demo local sin envio real, puedes dejar Supabase con placeholders.

## Supabase

Ejecuta la migración en `supabase/migrations/202606080001_create_leads_korean_lash.sql`.

La tabla principal es `leads_korean_lash`.

## Configuración de lanzamiento

Edita `src/config/launch.js` para cambiar:

- Fecha y hora del workshop
- URLs de grupos WhatsApp
- Logo
- Textos principales
- Score minimo VIP
- Colores de marca

## Deploy en Vercel

Consulta `docs/DEPLOYMENT.md`.

Variables de entorno esperadas:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_VIP_GROUP_URL`
- `VITE_COMMUNITY_GROUP_URL`
- `VITE_LOGO_URL`
- `VITE_GTM_ID`
- `VITE_META_PIXEL_ID`

## Tracking

La app emite eventos a `window.dataLayer`:

- `form_start`
- `form_step_completed`
- `lead_submit_attempt`
- `lead_submitted`
- `lead_vip`
- `lead_comunidad`
- `lead_submit_error`

Si `VITE_META_PIXEL_ID` existe, los mismos eventos se envian como `trackCustom` a Meta Pixel.

## Go-live

- Deploy: `docs/DEPLOYMENT.md`
- Supabase: `docs/SUPABASE.md`
- QA manual: `docs/QA.md`
