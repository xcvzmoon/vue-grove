import { type HighlighterCore, type ThemeRegistrationAny, createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { computed, shallowRef } from 'vue';

const core = createHighlighterCore({
  themes: [import('@shikijs/themes/one-dark-pro')],
  langs: [import('@shikijs/langs/vue'), import('@shikijs/langs/typescript')],
  engine: createJavaScriptRegexEngine(),
});

export function useShiki() {
  const highlighter = shallowRef<HighlighterCore>();

  const languages = computed<string[] | undefined>((oldValue) => {
    const newValue = highlighter.value?.getLoadedLanguages();
    const list = oldValue && oldValue === newValue ? oldValue : newValue;

    return list?.length ? list : undefined;
  });

  async function highlightCode(code: string, lang: string) {
    if (!highlighter.value) highlighter.value = await core;
    if (!languages.value?.includes(lang)) return;

    return highlighter.value.codeToHtml(code, {
      theme: highlighter.value.getLoadedThemes().at(0) as ThemeRegistrationAny,
      lang,
    });
  }

  function dispose() {
    if (highlighter.value) highlighter.value.dispose();
  }

  return { highlightCode, dispose };
}
