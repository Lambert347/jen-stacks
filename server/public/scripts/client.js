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