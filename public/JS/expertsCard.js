const availableButton = document.querySelector('.fa-circle');
const available = document.getElementsByClassName('availiblity');

// for (let index = 0; index < available.length; index++) {

//     console.log(available[index].innerText);
//     if (available[index].innerText === 'Not Available') {
//         availableButton.classList.add('active');
//     }

// }
let i = 0;
while (i < available.length) {
    console.log(available[i].innerText);
    i++;
}

// available.forEach(element => {
//     if (element.innerText === "Available") {
//         availableButton.classList.add('active');
//     } else if (element.innerText === "Not Available") {
//         availableButton.classList.add('inactive');
//     }
// });

