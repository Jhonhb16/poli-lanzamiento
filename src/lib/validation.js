export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function isValidWhatsApp(value) {
  const digits = String(value).replace(/[^\d]/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function normalizeWhatsApp(value) {
  return String(value).replace(/[^\d+]/g, '').trim();
}
