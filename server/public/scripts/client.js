console.log('client.js sourced');

$( document ).ready( onReady );
//function to ready the DOM for manipulation
function onReady() {
    console.log('DOM ready');
    //add handler for clicking on the add joke button
    $('#addJokeButton').on('click', addJoke);
    //calling the getJokes function to have all the jokes already on the server displayed when the DOM is loaded.
    getJokes();
}
//function to add a joke to the server's data
function addJoke(){
    //takes the values of the inputs from the three input fields and adds them to properties in a new object.
    let jokeObject = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }
    //ajax method to post the new object to the server using the jokeObject created above as the data to be sent and stored.
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: jokeObject,
    })
        //once done, receive back the data from the server to get the new joke onto the server.
        .then (function(resposne){
            getJokes();
        })
        //error function in the event that a joke could not be added to the server.
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not add joke, try again later');
        })
        //calls the clear input functions once the above is done to clear inputs for the next entry. 
    clearInputs();
}

//function to get the jokes data from the server and append it to the DOM
function getJokes(){
    //ajax method to receive data from the server
    $.ajax({
        method: 'GET',
        url: '/jokes',
    })
        //once done, then append that data to the DOM in a new div, with the appended 
        //elements being the properties and key values from the jokes array on the server.
        .then (function(response){
            console.log('Response from the server', response);
            $('#outputDiv').empty();
            console.log('Adding jokes to the DOM');
            //loop to move through the array and append each element to the dom
            for (let joke of response){
                $('#outputDiv').append(`
                    <div class="joke">
                    <p id="whose">${joke.whoseJoke}</p>
                    <p>${joke.jokeQuestion}</p>
                    <p>${joke.punchLine}</p>
                    </div>
                `)
            }
        })
        //error function in the even that the data could not be received.
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not get joke book, try again later');
        })
}
//function to clear the input fields.
function clearInputs(){
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}