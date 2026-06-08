import { launchConfig } from '../config/launch.js';

export function calculateScore(values) {
  let score = 0;

  if (values.vive_usa === 'Si') score += 20;
  if (values.es_mujer === 'Si') score += 20;
  if (values.objetivo === 'Tener mi propio negocio') score += 20;
  if (values.urgencia === 'Inmediatamente') score += 20;
  if (Number(values.compromiso) >= 8) score += 20;

  return score;
}

export function classifyLead(score) {
  return score >= launchConfig.vipMinimumScore ? 'VIP' : 'COMUNIDAD';
}
