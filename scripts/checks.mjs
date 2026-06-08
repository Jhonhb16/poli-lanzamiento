import { calculateScore, classifyLead } from '../src/lib/scoring.js';
import { getUtmParams } from '../src/lib/utm.js';
import { isValidEmail, isValidWhatsApp } from '../src/lib/validation.js';

const vipLead = {
  vive_usa: 'Sí',
  es_mujer: 'Sí',
  objetivo: 'Tener mi propio negocio',
  urgencia: 'Inmediatamente',
  compromiso: 8,
};

const communityLead = {
  vive_usa: 'No',
  es_mujer: 'Sí',
  objetivo: 'Aprender una nueva habilidad',
  urgencia: 'Este año',
  compromiso: 7,
};

assert(calculateScore(vipLead) === 100, 'VIP lead should score 100');
assert(classifyLead(calculateScore(vipLead)) === 'VIP', 'VIP lead should classify as VIP');
assert(calculateScore(communityLead) === 20, 'Community lead should score 20');
assert(
  classifyLead(calculateScore(communityLead)) === 'COMUNIDAD',
  'Community lead should classify as COMUNIDAD',
);
assert(isValidEmail('lead@example.com'), 'Valid email should pass');
assert(!isValidEmail('lead-example.com'), 'Invalid email should fail');
assert(isValidWhatsApp('+1 305 555 1212'), 'Valid WhatsApp should pass');
assert(!isValidWhatsApp('12345'), 'Invalid WhatsApp should fail');

const utm = getUtmParams('?utm_source=meta&utm_medium=paid&utm_campaign=launch');
assert(utm.utm_source === 'meta', 'utm_source should parse');
assert(utm.utm_medium === 'paid', 'utm_medium should parse');
assert(utm.utm_campaign === 'launch', 'utm_campaign should parse');
assert(utm.utm_term === null, 'missing UTM values should be null');

console.log('All checks passed.');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
