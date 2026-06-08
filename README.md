# Korean Lash Business Funnel

Aplicacion de captacion para el Workshop Korean Lash Business. Incluye formulario multi-step, scoring, clasificacion VIP/COMUNIDAD, captura UTM, guardado en Supabase y paginas de gracias con cuenta regresiva.

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

Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `.env.local`.

## Supabase

Ejecuta la migracion en `supabase/migrations/202606080001_create_leads_korean_lash.sql`.

La tabla principal es `leads_korean_lash`.

## Configuracion de lanzamiento

Edita `src/config/launch.js` para cambiar:

- Fecha y hora del workshop
- URLs de grupos WhatsApp
- Logo
- Textos principales
- Score minimo VIP
- Colores de marca

## Deploy en Vercel

1. Sube el repo a GitHub.
2. Importa el repo en Vercel.
3. Agrega las variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

## Tracking

La app emite eventos a `window.dataLayer`:

- `form_start`
- `form_step_completed`
- `lead_submit_attempt`
- `lead_submitted`
- `lead_vip`
- `lead_comunidad`
- `lead_submit_error`
