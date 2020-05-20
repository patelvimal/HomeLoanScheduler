window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-37554448-3');

// Hack: hude logo was displayed on initial page load as css was taking time to load
// thats why this hack is applied on body tag a class is added which will hide the page
//once page loaded, we will remove the class attribute which will remove the associate class as well
window.onload = function() {
    document.getElementsByTagName('body')[0].removeAttribute('class');
};