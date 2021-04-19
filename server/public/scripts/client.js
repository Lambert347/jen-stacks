console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);
    getJokes();
}

function addJoke(){
    let jokeObject = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
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
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not add joke, try again later');
        })

    clearInputs();
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
                    <p>${joke.punchLine}</p>
                    </div>
                `)
            }
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not get joke book, try again later');
        })
}
function clearInputs(){
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}