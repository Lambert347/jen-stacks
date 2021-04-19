console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);
}

function addJoke(){
    let jokeObject = {
        whoseJoke: $('#whoseJokeIn').val(),
        question: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: jokeObject,
    })
        .then (function(resposne){
            getJokes();
        })
        //do .catch later
}

function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes',
    })
        .then (function(response){
            console.log('Response from the server', response);
            $('#outputDiv').empty();
            console.log('Adding jokes to the DOM');
            for (let joke of response){
                $('#outputDiv').append(`
                    <div class="joke">
                    <p>${joke.whoseJoke}</p>
                    <p>${joke.jokeQuestion}</p>
                    <p>${joke.punchline}</p>
                `)
            }
        })
}
function clearInputs(){
    $('#whoseJokeIn').val(''),
    $('#questionIn').val(''),
    $('#punchlineIn').val(''),

}