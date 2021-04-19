//sets up express to be used by the server
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = 5000;

// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));
//array to hold the jokes on the server to be sent to and edited by the client.
let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

// serve back static files
app.use(express.static('server/public'));
//when requested by the client, send the jokes array
app.get('/jokes', (req, res) => {
  res.send(jokes);
  console.log('Sending joke book', jokes);
})
//when requested by the client, receive a new joke object from the client's inputs
app.post('/jokes', (req, res) => {
  //declare new variable set to that request body
  let newJoke = req.body;
  console.log('Got new joke', newJoke);
  //send back status indicating to the client that the object was created successfully.
  res.sendStatus(201);
  //push the new joke object to the already existing array alongside the other already present jokes.
  jokes.push(newJoke);
})

//function to prepare the server to listen on the port, designated above as 5000.
app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
