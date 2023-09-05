// This function evaluates the sum of two given numbers (floats)
function calculate() {
    console.log('Button Has been pressed') // DEBUG

    // Getting user field inputs
    const user_input_1 = document.getElementById('num1').value;
    const user_input_2 = document.getElementById('num2').value;

    // Converting user inputs to floats
    const num1 = parseFloat(user_input_1);
    const num2 = parseFloat(user_input_2);

    // Checking if fields are populated
    if (!isNaN(num1) && !isNaN(num2)) {
        // Checking if values are numerical
        if (isInputNumerical(user_input_1) && isInputNumerical(user_input_2)) {
            const resultDiv = document.getElementById('result');
            const sum = num1 + num2; // Sum evaulation

            // Determining if the result is an integer, if true, print the result
            // as an integer. If false, print the result as a float rounded to 
            // three decimal places.
            const result = Number.isInteger(sum) ? sum : sum.toFixed(3); 
            resultDiv.innerText = result;
        } else {
            alert("Please enter valid numbers");
        }
    } else {
        alert("Please supply numbers both respective fields");
    }
}

// This function determines if the input value is numerical
function isInputNumerical(input) {
    return /^[0-9]+(\.[0-9]+)?$/.test(input);
}

const cardList = [ {
        title: "Scenery 1",
        image: "images/scenery1.jpg",
        link: "About Scenery 1",
        description: "Demo description about scenery 1"
    },
    {
        title: "Scenery 2",
        image: "images/scenery2.jpg",
        link: "About Scenery 2",
        description: "Demo description about scenery 2"
    },
    {
        title: "Scenery 3",
        image: "images/scenery3.jpg",
        link: "About Scenery 3",
        description: "Demo description about scenery 3"
    }
];

const clickMe = () => {
    // alert("Thanks for clicking me. Hope you have a nice day!")
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
        '</div><div class="card-content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.path+'</a></p></div>'+
        '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.description+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

let socket = io();
socket.on('number', (msg)=>{
    console.log('Random Number: ' + msg);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() =>{
        submitForm();
    })
    $('.modal').modal();
    getAllScenery();
});
    

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();
    console.log("Form Data Submitted: ", formData);
    postScenery(formData);
}

function postScenery(scenery) {
    $.ajax({
        url: '/api/scenery',
        type: 'POST',
        data: JSON.stringify(scenery),
        contentType: 'application/json', 
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Scenery post successful');
            }
        }
    });
}

function getAllScenery() {
    $.get('/api/sceneries', (response) => { 
        if (response.data && response.data.length > 0) {
            addCards(response.data);
        }
    })
}
