import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, MessageCircle, Send } from 'lucide';
import './styles.css';
import { launchConfig } from './config/launch.js';
import { calculateScore, classifyLead } from './lib/scoring.js';
import { saveLead, isSupabaseConfigured } from './lib/supabase.js';
import { getUtmParams } from './lib/utm.js';
import { track } from './lib/tracking.js';
import { isValidEmail, isValidWhatsApp, normalizeWhatsApp } from './lib/validation.js';

const app = document.querySelector('#app');

const questions = [
  {
    key: 'vive_usa',
    label: 'Actualmente vives en Estados Unidos?',
    type: 'choice',
    options: ['Si', 'No'],
  },
  {
    key: 'es_mujer',
    label: 'Eres mujer?',
    type: 'choice',
    options: ['Si', 'No'],
  },
  {
    key: 'situacion_actual',
    label: 'Cual describe mejor tu situacion actual?',
    type: 'choice',
    options: ['Tengo empleo', 'Soy ama de casa', 'Tengo un pequeno negocio', 'Actualmente no trabajo'],
  },
  {
    key: 'objetivo',
    label: 'Cual es tu principal objetivo?',
    type: 'choice',
    options: [
      'Generar ingresos extra',
      'Tener mi propio negocio',
      'Aprender una nueva habilidad',
      'Solo estoy investigando opciones',
    ],
  },
  {
    key: 'urgencia',
    label:
      'Si encontraras una metodologia paso a paso para aprender extensiones de pestanas y construir un negocio, cuando te gustaria comenzar?',
    type: 'choice',
    options: ['Inmediatamente', 'En los proximos 90 dias', 'Este ano', 'Solo estoy explorando'],
  },
  {
    key: 'asistencia',
    label: 'Podrias asistir a una sesion online en vivo el 23 de junio?',
    type: 'choice',
    options: ['Si', 'Probablemente', 'No estoy segura'],
  },
  {
    key: 'compromiso',
    label: 'Que tan comprometida estas con construir una nueva fuente de ingresos?',
    type: 'scale',
    min: 1,
    max: 10,
  },
  {
    key: 'objecion_principal',
    label: 'Que te impide comenzar tu propio negocio hoy?',
    type: 'choice',
    options: [
      'Falta de dinero',
      'Falta de tiempo',
      'Falta de experiencia',
      'No se conseguir clientas',
      'Tengo miedo de fracasar',
    ],
  },
  {
    key: 'ciudad',
    label: 'En que ciudad de Estados Unidos vives?',
    type: 'text',
    placeholder: 'Ej. Miami, Houston, Orlando',
  },
  {
    key: 'nombre',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Escribe tu nombre y apellido',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    type: 'tel',
    placeholder: '+1 305 000 0000',
  },
  {
    key: 'email',
    label: 'Correo electronico',
    type: 'email',
    placeholder: 'tu@email.com',
  },
];

const state = {
  step: 0,
  values: {
    compromiso: 8,
  },
  error: '',
  isSubmitting: false,
  hasStarted: false,
};

const iconMap = {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Send,
};

function icon(name, className = 'h-5 w-5') {
  return iconMap[name]?.toSvg({ class: className, 'stroke-width': 2.2 }) || '';
}

function render() {
  const path = window.location.pathname;

  if (path === '/gracias-vip') {
    renderThankYou('vip');
    return;
  }

  if (path === '/gracias-comunidad') {
    renderThankYou('community');
    return;
  }

  renderForm();
}

function renderForm() {
  const question = questions[state.step];
  const progress = Math.round(((state.step + 1) / questions.length) * 100);

  app.innerHTML = `
    <main class="form-shell bg-[radial-gradient(circle_at_top_left,_rgba(216,179,106,0.22),_transparent_34%),linear-gradient(135deg,_#fff8f2_0%,_#f9edf0_44%,_#f6f5ef_100%)] px-4 py-5 text-ink sm:px-6 sm:py-8">
      <section class="mx-auto grid min-h-[calc(100vh-40px)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside class="hidden lg:block">
          <div class="max-w-md">
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-rosewood">Workshop premium</p>
            <h1 class="font-display text-5xl font-extrabold leading-[1.02] text-ink">
              ${launchConfig.brandName}
            </h1>
            <p class="mt-5 text-lg leading-8 text-[#5c4a50]">${launchConfig.subtitle}</p>
            <div class="mt-8 grid grid-cols-3 gap-3 text-sm">
              <div class="rounded-lg border border-white/80 bg-white/55 p-4 shadow-soft">
                <strong class="block text-2xl text-rosewood">800+</strong>
                alumnas graduadas
              </div>
              <div class="rounded-lg border border-white/80 bg-white/55 p-4 shadow-soft">
                <strong class="block text-2xl text-rosewood">USA</strong>
                enfoque de negocio
              </div>
              <div class="rounded-lg border border-white/80 bg-white/55 p-4 shadow-soft">
                <strong class="block text-2xl text-rosewood">Live</strong>
                sesion online
              </div>
            </div>
          </div>
        </aside>

        <section class="mx-auto w-full max-w-2xl rounded-lg border border-white/80 bg-white/82 p-4 shadow-soft backdrop-blur sm:p-6 lg:p-8">
          <header class="mb-6">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-rosewood">${launchConfig.eventName}</p>
                <h2 class="mt-2 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                  Aplicacion al workshop
                </h2>
              </div>
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rosewood text-sm font-extrabold text-white">
                ${progress}%
              </div>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-blush">
              <div class="h-full rounded-full bg-rosewood transition-all duration-300" style="width: ${progress}%"></div>
            </div>
          </header>

          <div class="mb-3 flex items-center gap-2 text-sm font-semibold text-[#715b63]">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7eef0] text-rosewood">${state.step + 1}</span>
            <span>Pregunta ${state.step + 1} de ${questions.length}</span>
          </div>

          <h3 class="mb-5 text-balance text-2xl font-extrabold leading-tight text-ink sm:text-3xl">${question.label}</h3>

          <form id="lead-form" class="space-y-5">
            ${renderQuestion(question)}

            ${
              state.error
                ? `<p class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">${state.error}</p>`
                : ''
            }

            <div class="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                id="back-button"
                class="flex h-12 w-12 items-center justify-center rounded-full border border-[#e8d5dc] bg-white text-rosewood transition hover:border-rosewood disabled:cursor-not-allowed disabled:opacity-35"
                ${state.step === 0 ? 'disabled' : ''}
                aria-label="Volver"
              >
                ${icon('ArrowLeft')}
              </button>
              <button
                type="submit"
                class="inline-flex h-12 min-w-40 items-center justify-center gap-2 rounded-full bg-rosewood px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#63253b] disabled:cursor-wait disabled:opacity-70"
                ${state.isSubmitting ? 'disabled' : ''}
              >
                ${state.isSubmitting ? 'Enviando' : state.step === questions.length - 1 ? 'Enviar solicitud' : 'Continuar'}
                ${icon(state.step === questions.length - 1 ? 'Send' : 'ArrowRight', 'h-4 w-4')}
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  `;

  bindFormEvents(question);
}

function renderQuestion(question) {
  if (question.type === 'choice') {
    return `
      <div class="grid gap-3">
        ${question.options
          .map((option) => {
            const selected = state.values[question.key] === option;
            return `
              <button
                type="button"
                class="option-card flex w-full items-center justify-between rounded-lg border px-4 py-4 text-left text-base font-bold transition ${
                  selected
                    ? 'border-rosewood bg-[#fff0f4] text-rosewood shadow-soft'
                    : 'border-[#eadce0] bg-white text-ink hover:border-rosewood'
                }"
                data-choice="${escapeAttribute(option)}"
              >
                <span>${option}</span>
                <span class="flex h-7 w-7 items-center justify-center rounded-full ${
                  selected ? 'bg-rosewood text-white' : 'bg-[#f4eaed] text-[#8b757d]'
                }">${selected ? icon('Check', 'h-4 w-4') : ''}</span>
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }

  if (question.type === 'scale') {
    const value = Number(state.values[question.key] || question.min);
    return `
      <div class="rounded-lg border border-[#eadce0] bg-white p-5">
        <div class="mb-5 flex items-end justify-between">
          <span class="text-sm font-bold text-[#715b63]">Bajo</span>
          <strong class="text-5xl font-extrabold text-rosewood">${value}</strong>
          <span class="text-sm font-bold text-[#715b63]">Alto</span>
        </div>
        <input
          id="field-${question.key}"
          class="w-full accent-rosewood"
          type="range"
          min="${question.min}"
          max="${question.max}"
          value="${value}"
        />
        <div class="mt-4 grid grid-cols-10 text-center text-xs font-bold text-[#8a737b]">
          ${Array.from({ length: 10 }, (_, i) => `<span>${i + 1}</span>`).join('')}
        </div>
      </div>
    `;
  }

  return `
    <input
      id="field-${question.key}"
      type="${question.type}"
      value="${escapeAttribute(state.values[question.key] || '')}"
      placeholder="${question.placeholder || ''}"
      class="h-14 w-full rounded-lg border border-[#eadce0] bg-white px-4 text-lg font-semibold text-ink outline-none transition placeholder:text-[#b5a4aa] focus:border-rosewood focus:ring-4 focus:ring-[#f6dde5]"
    />
  `;
}

function bindFormEvents(question) {
  const form = document.querySelector('#lead-form');
  const backButton = document.querySelector('#back-button');

  document.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      state.values[question.key] = button.dataset.choice;
      state.error = '';
      if (!state.hasStarted) {
        state.hasStarted = true;
        track('form_start', { step: state.step + 1 });
      }
      render();
    });
  });

  const field = document.querySelector(`#field-${question.key}`);
  if (field) {
    field.addEventListener('input', () => {
      state.values[question.key] = field.value;
      state.error = '';
      if (!state.hasStarted) {
        state.hasStarted = true;
        track('form_start', { step: state.step + 1 });
      }
      if (question.type === 'scale') render();
    });
  }

  backButton.addEventListener('click', () => {
    state.step = Math.max(0, state.step - 1);
    state.error = '';
    render();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleNext(question);
  });
}

async function handleNext(question) {
  const validationError = validateCurrentStep(question);
  if (validationError) {
    state.error = validationError;
    render();
    return;
  }

  track('form_step_completed', {
    step: state.step + 1,
    field: question.key,
  });

  if (state.step < questions.length - 1) {
    state.step += 1;
    state.error = '';
    render();
    return;
  }

  await submitLead();
}

function validateCurrentStep(question) {
  const value = state.values[question.key];

  if (question.type !== 'scale' && !String(value || '').trim()) {
    return 'Completa esta pregunta para continuar.';
  }

  if (question.key === 'email' && !isValidEmail(value)) {
    return 'Escribe un correo electronico valido.';
  }

  if (question.key === 'whatsapp' && !isValidWhatsApp(value)) {
    return 'Escribe un WhatsApp valido con codigo de pais o area.';
  }

  return '';
}

async function submitLead() {
  const score = calculateScore(state.values);
  const clasificacion = classifyLead(score);
  const lead = {
    ...state.values,
    compromiso: Number(state.values.compromiso),
    whatsapp: normalizeWhatsApp(state.values.whatsapp),
    score,
    clasificacion,
    ...getUtmParams(),
  };

  state.isSubmitting = true;
  state.error = '';
  render();

  track('lead_submit_attempt', { score, clasificacion });

  try {
    await saveLead(lead);
    track('lead_submitted', { score, clasificacion });
    track(clasificacion === 'VIP' ? 'lead_vip' : 'lead_comunidad', { score });
    window.location.assign(clasificacion === 'VIP' ? '/gracias-vip' : '/gracias-comunidad');
  } catch (error) {
    state.isSubmitting = false;
    state.error = isSupabaseConfigured
      ? 'No pudimos guardar tu solicitud en este momento. Intentalo de nuevo en unos segundos.'
      : 'La conexion con Supabase aun no esta configurada. Agrega las variables de entorno para activar el envio.';
    track('lead_submit_error', {
      message: error.message,
      score,
      clasificacion,
    });
    render();
  }
}

function renderThankYou(type) {
  const config = type === 'vip' ? launchConfig.thankYou.vip : launchConfig.thankYou.community;
  const groupUrl = type === 'vip' ? launchConfig.vipGroupUrl : launchConfig.communityGroupUrl;

  app.innerHTML = `
    <main class="min-h-screen bg-[linear-gradient(135deg,_#fff8f2,_#faedf1_48%,_#f6f5ef)] px-4 py-8 text-ink">
      <section class="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl items-center">
        <div class="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-rosewood">${launchConfig.eventName}</p>
            <h1 class="font-display text-5xl font-extrabold leading-[1.02] text-ink sm:text-6xl">${config.title}</h1>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-[#604d54]">${config.body}</p>
            <ul class="mt-6 grid gap-3">
              ${config.bullets
                .map(
                  (item) => `
                    <li class="flex items-start gap-3 text-base font-semibold text-[#4f4046]">
                      <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rosewood text-white">${icon('Check', 'h-4 w-4')}</span>
                      <span>${item}</span>
                    </li>
                  `,
                )
                .join('')}
            </ul>
            <a
              href="${groupUrl}"
              class="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-rosewood px-7 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#63253b]"
            >
              ${config.buttonLabel}
              ${icon('MessageCircle', 'h-5 w-5')}
            </a>
          </div>
          <aside class="rounded-lg border border-white/80 bg-white/82 p-5 shadow-soft backdrop-blur sm:p-7">
            <div class="mb-5 flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f4] text-rosewood">${icon('CalendarDays')}</span>
              <div>
                <p class="text-sm font-bold text-[#715b63]">Fecha del workshop</p>
                <p class="text-xl font-extrabold text-ink">${launchConfig.workshopDisplayDate}</p>
              </div>
            </div>
            <div class="mb-7 flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f4] text-rosewood">${icon('Clock')}</span>
              <div>
                <p class="text-sm font-bold text-[#715b63]">Hora</p>
                <p class="text-xl font-extrabold text-ink">${launchConfig.workshopDisplayTime}</p>
              </div>
            </div>
            <div>
              <p class="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-rosewood">Cuenta regresiva</p>
              <div id="countdown" class="grid grid-cols-4 gap-2"></div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `;

  startCountdown();
}

function startCountdown() {
  const target = new Date(launchConfig.workshopDateTimeISO).getTime();
  const countdown = document.querySelector('#countdown');

  function update() {
    const distance = Math.max(0, target - Date.now());
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdown.innerHTML = [
      ['Dias', days],
      ['Horas', hours],
      ['Min', minutes],
      ['Seg', seconds],
    ]
      .map(
        ([label, value]) => `
          <div class="rounded-lg bg-[#fff0f4] p-3 text-center">
            <strong class="block text-2xl font-extrabold text-rosewood">${String(value).padStart(2, '0')}</strong>
            <span class="text-xs font-bold uppercase tracking-[0.12em] text-[#715b63]">${label}</span>
          </div>
        `,
      )
      .join('');
  }

  update();
  window.setInterval(update, 1000);
}

function escapeAttribute(value) {
  return String(value).replace(/"/g, '&quot;');
}

render();
