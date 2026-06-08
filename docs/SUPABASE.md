# Supabase

## Crear tabla

1. Abre tu proyecto en Supabase.
2. Ve a **SQL Editor**.
3. Pega y ejecuta:

```sql
-- Archivo fuente:
-- supabase/migrations/202606080001_create_leads_korean_lash.sql
```

Usa el contenido completo del archivo `supabase/migrations/202606080001_create_leads_korean_lash.sql`.

## Variables para Vercel

En Supabase, ve a **Project Settings > API** y copia:

- Project URL -> `VITE_SUPABASE_URL`
- anon public key -> `VITE_SUPABASE_ANON_KEY`

## Prueba de insercion

1. Despliega en Vercel con variables reales.
2. Abre el formulario.
3. Completa un lead VIP:
   - Vive en USA: `Sí`
   - Es mujer: `Sí`
   - Objetivo: `Tener mi propio negocio`
   - Urgencia: `Inmediatamente`
   - Compromiso: `8` o mas
4. En Supabase, abre **Table Editor > leads_korean_lash**.
5. Verifica:
   - `score = 100`
   - `clasificacion = VIP`
   - UTMs si usaste URL con parametros.

## Seguridad v1

- La tabla tiene RLS activado.
- Solo se permite `insert` publico para `anon`.
- No se crea politica publica de lectura, actualizacion ni borrado.

## Campos principales

- Datos de contacto: `nombre`, `email`, `whatsapp`, `ciudad`.
- Respuestas de calificacion: `vive_usa`, `es_mujer`, `situacion_actual`, `objetivo`, `urgencia`, `asistencia`, `compromiso`, `objecion_principal`.
- Segmentacion: `score`, `clasificacion`.
- Atribucion: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
