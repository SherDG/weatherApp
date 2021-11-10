// const { response } = require("express");
// const utils = require("./utils/utils");

// console.log("Console working!");

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// });

// fetch('http://localhost:3000/weather?adress=Kyiv').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }

//     })
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('/weather?adress=' + location).then((response) => {
        response.json().then((data) => {
            // console.log('Check',data);
            // console.log('Check1',data.err);
            // console.log('Check2');
            if (data.error) {
                // console.log(data);
                // console.log(data.error);
                message1.textContent = data.error;
            }
            else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
                
                // console.log(data.location);
                // console.log(data.forecast);
            }

        })
    });
});