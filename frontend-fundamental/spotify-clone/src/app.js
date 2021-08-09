// fix regenrator-runtime undefined on es5
import 'regenerator-runtime';

// global styles
import './styles/style.css';

// main function
import main from './scripts/view/main.js';

// initial
import './scripts/components/app-bar.js';
import './scripts/components/nav-bar.js';
import './scripts/components/main-content.js';


// import './scripts/components/test-css.js';

document.addEventListener('DOMContentLoaded', main);
