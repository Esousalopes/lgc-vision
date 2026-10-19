const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const locationImages = document.querySelectorAll('.photo-frame img');
const locationFadeDuration = 1200;

locationImages.forEach(image => {
  image.style.transition = `opacity ${locationFadeDuration}ms ease`;
});
locationImages[0].classList.add('is-active');

let activeLocationImage = 0;
window.setInterval(() => {
  const previousImage = locationImages[activeLocationImage];
  previousImage.style.opacity = '0';
  window.setTimeout(() => previousImage.classList.remove('is-active'), locationFadeDuration);
  activeLocationImage = (activeLocationImage + 1) % locationImages.length;
  const nextImage = locationImages[activeLocationImage];
  nextImage.classList.add('is-active');
  nextImage.style.opacity = '1';
}, 5000);

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

// Configure this address before publishing. The static site opens the visitor's
// email application with the request prefilled; it does not send data to a server.
const CONTACT_EMAIL = 'A_CONFIGURER';
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = [
    'Demande d’information — LGC VISION',
    '',
    `Nom : ${data.get('name')}`,
    `Entreprise : ${data.get('company')}`,
    `E-mail : ${data.get('email')}`,
    `Téléphone : ${data.get('phone') || 'Non renseigné'}`,
    `Besoin : ${data.get('need')}`,
    '',
    'Message :',
    data.get('message'),
    '',
    'Consentement : oui'
  ].join('\n');
  if (CONTACT_EMAIL === 'A_CONFIGURER') {
    feedback.textContent = 'Le formulaire est prêt, mais l’adresse e-mail de réception doit être configurée dans script.js avant la mise en ligne.';
    return;
  }
  const subject = encodeURIComponent('Demande d’information — LGC VISION');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
  feedback.textContent = 'Votre application e-mail va s’ouvrir avec votre demande préremplie. Pensez à envoyer le message.';
});
