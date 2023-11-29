import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { render } from 'solid-js/web';
import { Settings } from './components/Settings';

const element = document.getElementById('root');
if (element) {
    render(() => <Settings />, element);
} else {
    console.error(`Element with id root not found`);
}