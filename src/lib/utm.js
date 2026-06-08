const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export function getUtmParams(search = window.location.search) {
  const params = new URLSearchParams(search);

  return UTM_KEYS.reduce((acc, key) => {
    acc[key] = params.get(key) || null;
    return acc;
  }, {});
}
