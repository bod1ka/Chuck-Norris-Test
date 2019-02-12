import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');
configure({ adapter: new Adapter() });


const portalRoot = document.createElement('div');
portalRoot.setAttribute('id','modal-root');
document.body.appendChild(portalRoot);