//* For Hamburger Menu 
const hamburger = document.querySelector('.h-icon')

hamburger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');

    if (hamburger.getAttribute('src') == 'Assets/Icons/square.png') {
        hamburger.setAttribute('src', 'Assets/Icons/cancel.png')
    }
    else {
        hamburger.setAttribute('src', 'Assets/Icons/square.png')
    }
})

//* For Password View Icon 

const viewIcon = document.querySelector('#view');
const password = document.querySelector('#password');

viewIcon.addEventListener('click', () => {
    if (password.getAttribute('type') !== 'text') {
        password.setAttribute('type', 'text');
    }
    else {
        password.setAttribute('type', 'password');
    }
    if (viewIcon.getAttribute('src') == 'Assets/Icons/view.png') {
        viewIcon.setAttribute('src', 'Assets/Icons/hide.png')
    }
    else {
        viewIcon.setAttribute('src', 'Assets/Icons/view.png')
    }
})