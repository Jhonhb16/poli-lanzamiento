# Checklist QA

## Build

- `npm install`
- `npm test`
- `npm run build`

## Formulario

- La barra de progreso avanza en cada paso.
- El porcentaje completado cambia correctamente.
- El boton volver funciona.
- No aparece lenguaje negativo como "rechazada" o "no calificas".
- Campos requeridos bloquean continuar si estan vacios.
- Email invalido muestra error.
- WhatsApp invalido muestra error.

## Scoring

- VIP:
  - Vive en USA: `Sí`
  - Es mujer: `Sí`
  - Objetivo: `Tener mi propio negocio`
  - Urgencia: `Inmediatamente`
  - Compromiso: `8` a `10`
  - Resultado esperado: `/gracias-vip`

- Comunidad:
  - Cualquier combinacion con score menor a `80`
  - Resultado esperado: `/gracias-comunidad`

## Supabase

- Lead guardado en `leads_korean_lash`.
- `score` correcto.
- `clasificacion` correcta.
- `created_at` presente.
- No se guardan valores vacios en campos requeridos.

## UTMs

Probar con:

```text
/?utm_source=meta&utm_medium=paid&utm_campaign=launch&utm_content=ad1&utm_term=lashes
```

Verificar en Supabase:

- `utm_source = meta`
- `utm_medium = paid`
- `utm_campaign = launch`
- `utm_content = ad1`
- `utm_term = lashes`

## Gracias

- `/gracias-vip` muestra texto VIP, fecha, hora, cuenta regresiva y boton al grupo VIP.
- `/gracias-comunidad` muestra texto Comunidad, fecha, hora, cuenta regresiva y boton a Comunidad.
- Los botones abren las URLs reales de WhatsApp configuradas en Vercel.

## Tracking

- `window.dataLayer` existe.
- Eventos esperados:
  - `form_start`
  - `form_step_completed`
  - `lead_submit_attempt`
  - `lead_submitted`
  - `lead_vip` o `lead_comunidad`
  - `lead_submit_error`, solo si falla Supabase.
- Si `VITE_META_PIXEL_ID` esta configurado, validar eventos `trackCustom` con Meta Pixel Helper.

## Responsive

- Probar en ancho movil: 375px.
- Probar en tablet: 768px.
- Probar desktop: 1440px.
- Confirmar que botones, cards y textos no se superponen.
