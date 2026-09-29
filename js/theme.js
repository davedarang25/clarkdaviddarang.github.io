/**
 * theme.js — Coruscant Command (light) / Venator Bridge (dark) mode switch
 */

const ThemeEngine = (() => {
  const STORAGE_KEY = "republic-theme";
  const DARK = "venator";
  const LIGHT = "coruscant";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* storage unavailable, proceed silently */
    }
  }

  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function apply(mode) {
    const root = document.documentElement;
    if (mode === DARK) {
      root.classList.add("dark");
      root.setAttribute("data-theme", DARK);
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", LIGHT);
    }
    updateToggleUI(mode);
    setStored(mode);
  }

  function updateToggleUI(mode) {
    const labels = document.querySelectorAll("[data-theme-label]");
    labels.forEach((el) => {
      el.textContent = mode === DARK ? "VENATOR BRIDGE" : "CORUSCANT COMMAND";
    });
    const icons = document.querySelectorAll("[data-theme-icon]");
    icons.forEach((el) => {
      el.setAttribute("data-lucide", mode === DARK ? "moon" : "sun");
    });
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    apply(current === DARK ? LIGHT : DARK);
  }

  function init() {
    const stored = getStored();
    const initialMode = stored || (systemPrefersDark() ? DARK : LIGHT);
    apply(initialMode);

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-theme-toggle]");
      if (trigger) toggle();
    });
  }

  return { init, toggle, apply, DARK, LIGHT };
})();

document.addEventListener("DOMContentLoaded", ThemeEngine.init);
window.ThemeEngine = ThemeEngine;
