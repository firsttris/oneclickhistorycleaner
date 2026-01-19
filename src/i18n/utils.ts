/**
 * Helper function for Chrome i18n
 * @param messageName - The name of the message in messages.json
 * @param substitutions - Optional substitutions for placeholders
 * @returns The localized message
 */
export const t = (messageName: string, substitutions?: string | string[]): string => {
  try {
    const message = chrome.i18n.getMessage(messageName, substitutions);
    return message || messageName;
  } catch (error) {
    console.error(`Failed to get i18n message for "${messageName}":`, error);
    return messageName;
  }
};