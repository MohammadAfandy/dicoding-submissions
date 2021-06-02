// for hamburger mobile menu nav
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('nav ul');
const overlay = document.querySelector('.overlay');

mobileBtn.addEventListener('click', () => {
  menu.className += ' nav-open';
  overlay.className += ' open';
})

window.addEventListener('click', (event) => {
  if(event.target === overlay){
    menu.className = '';
    overlay.className = 'overlay';
  }
})

// for form submit contact us
const buttonSend = document.querySelector('.btn-submit');

buttonSend.addEventListener('click', (e) => {
  const name = document.querySelector('.form-contact input[name="name"]').value;
  const email = document.querySelector('.form-contact input[name="email"]').value;
  const message = document.querySelector('.form-contact textarea[name="message"]').value;

  const errors = [];
  if (!name) errors.push('Nama');
  if (!email) errors.push('Email');
  if (!message) errors.push('Message');

  if (errors.length) {
    alert(`Silakan Isi Field ${errors.join(', ')}`);
  } else {
    alert(`Pesan anda telah kami terima, terima kasih telah menghubungi kami`);
  }
});
