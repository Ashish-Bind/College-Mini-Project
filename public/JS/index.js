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
