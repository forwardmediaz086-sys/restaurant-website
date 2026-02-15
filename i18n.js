// i18n.js - 3 languages (TH / EN / 中文) for static hosting
(() => {
  const SUPPORTED = ["th", "en", "zh"];
  const DEFAULT_LANG = "th";
  const STORAGE_KEY = "siteLanguage";

  async function loadDict(lang) {
    const res = await fetch(`./locales/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Missing locale: ${lang}`);
    return res.json();
  }

  function applyDict(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict && dict[key];
      if (typeof val !== "string") return;

      const attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });
  }

  function setActiveButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const active = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("bg-purple-900/60", active);
      btn.classList.toggle("bg-slate-900", !active);
    });
  }

  async function setLanguage(lang) {
    const safe = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, safe);
    document.documentElement.lang = safe;

    const dict = await loadDict(safe);
    applyDict(dict);
    setActiveButtons(safe);
  }

  function detectLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;

    const nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
  }

  function init() {
    // Expose for onclick="setLanguage('en')"
    window.setLanguage = setLanguage;

    const lang = detectLanguage();
    setLanguage(lang).catch(() => setLanguage(DEFAULT_LANG));
  }

  window.i18n = { setLanguage, init };
})();
