import { render } from 'solid-js/web';
import { Settings } from './components/Settings';
import '@fontsource/roboto';

const element = document.getElementById('root');
if (element) {
    render(() => <Settings />, element);
} else {
    console.error(`Element with id root not found`);
}