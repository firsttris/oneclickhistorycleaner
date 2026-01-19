import { clearHistory } from "./clearHistory";

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await clearHistory();
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
});