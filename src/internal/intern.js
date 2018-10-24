import jquery from 'jquery';

// load JQuery
(window.$ = window.jQuery = jquery);

// set frame background
const frame = document.querySelector('.site-frame');
frame.style.backgroundImage = `url(placeholder/site-${process.env.SITE}.png)`