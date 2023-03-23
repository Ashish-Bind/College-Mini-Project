const hireButton = document.querySelector('.hire-btn');
const expertEmailId = document.querySelector('.expert-email').textContent;
let isHired = false;

if (!isHired) {
    hireButton.addEventListener('click', () => {
        window.location = `mailto:${expertEmailId}`

        hireButton.classList.toggle('active');
        if (hireButton.textContent === "Hire Expert") {
            hireButton.textContent = 'Cancel'
            isHired = true;
        } else {
            hireButton.textContent = 'Hire Expert'
        }
    })
}