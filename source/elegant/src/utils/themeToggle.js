import { useIsomorphicLayoutEffect } from '@/utils/Hooks/useIsomorphicLayoutEffect';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';

export const useSetting = create((set) => ({
    setting: null,
    setSetting: (setting) => set({ setting }),
}));

export const update = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark', 'changing-theme');

      {document.querySelector('meta[name="theme-color"]') !== null &&
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0B1120');
      }
    } else {
      document.documentElement.classList.remove('dark', 'changing-theme');

      {document.querySelector('meta[name="theme-color"]') !== null &&
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f8fafc');
      }
    }
    window.setTimeout(() => {
      document.documentElement.classList.remove('changing-theme');
    })
};

export const useTheme = () => {
  let { setting, setSetting } = useSetting()
  let initial = useRef(true)

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme)
    } else {
      setSetting('system')
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme')
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting
    }
    if (initial.current) {
      initial.current = false
    } else {
      update()
    }
  }, [setting])

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', update);
    } else {
      mediaQuery.addListener(update);
    }

    function onStorage() {
      update();
      let theme = localStorage.theme;

      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    };

    window.addEventListener('storage', onStorage);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', update);
      } else {
        mediaQuery.removeListener(update);
      }

      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return [setting, setSetting];
};