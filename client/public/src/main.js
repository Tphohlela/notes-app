console.log('Main.js is loaded!');
import Alpine from 'alpinejs';
import notesApp from './notes-app.js'


window.Alpine = Alpine;

Alpine.data('notes',notesApp)
Alpine.start();
