import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface Message {
  message: string;
  placeholders?: Record<string, { content: string }>;
}

/**
 * The parts of the extension API the options page uses, for loading it as a plain page: empty
 * storage (the default settings) and the English messages. Returns a script for page.addInitScript.
 */
export const chromeStub = () => {
  const messages = JSON.parse(
    readFileSync(join(process.cwd(), 'public', '_locales', 'en', 'messages.json'), 'utf8')
  ) as Record<string, Message>;

  return `(() => {
    const messages = ${JSON.stringify(messages)};
    const storage = {};
    const noop = () => {};
    const event = { addListener: noop, removeListener: noop, hasListener: () => false };
    window.chrome = {
      storage: {
        sync: {
          get: async (keys) => {
            const list = keys == null ? Object.keys(storage) : [].concat(keys);
            return Object.fromEntries(list.filter((key) => key in storage).map((key) => [key, storage[key]]));
          },
          set: async (items) => { Object.assign(storage, items); },
        },
        onChanged: event,
      },
      i18n: {
        getMessage: (name, substitutions) => {
          const entry = messages[name];
          if (!entry) return '';
          const subs = [].concat(substitutions ?? []);
          const text = entry.message.replace(/\\$(\\w+)\\$/g, (match, key) => entry.placeholders?.[key.toLowerCase()]?.content ?? match);
          return text.replace(/\\$(\\d)/g, (_, n) => subs[Number(n) - 1] ?? '');
        },
        getUILanguage: () => 'en',
      },
      runtime: { getURL: (path) => path, onMessage: event },
      tabs: { query: async () => [], create: noop, reload: noop, remove: noop },
      browsingData: { remove: async () => {} },
      notifications: { create: noop, clear: noop },
    };
  })();`;
};
