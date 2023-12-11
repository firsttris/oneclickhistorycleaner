import { render } from 'solid-js/web';
import { Settings } from './components/Settings';
import '@fontsource/roboto';

const element = document.getElementById('root');
render(() => <Settings />, element!);