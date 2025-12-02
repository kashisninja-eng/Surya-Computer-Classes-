// Basic interactivity: Alert on form submit
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! (Note: This is a demo; integrate with a backend for real sending.)');
});