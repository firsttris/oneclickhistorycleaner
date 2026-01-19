import { render } from 'solid-js/web';
import { Settings } from './components/Settings';
import '@fontsource/roboto';
import './index.css';

const element = document.getElementById('root');

if (element) {
  render(() => <Settings />, element);
} else {
  console.error('Root element not found');
}