import { clearHistory } from './clearHistory';

chrome.action.onClicked.addListener(() => {
  void clearHistory({ notify: true });
});
