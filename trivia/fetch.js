
function authDomain() {
  fetch("https://api.jsonbin.io/v3/b/64c099379d312622a3850298?meta=false ")
  .then(response => response.json())
  .then(data => {
    authGet = data;
    const authKey = authGet.triviaApp;
    const yourKey = "ZxETtfuxzACHHjr";
    const authApi = authKey.key;
    if (authApi === yourKey && authKey.service === "true"){
      console.log("Authenticated Successfully");
      const initurl = "https://opentdb.com/api.php?amount=1&type=multiple";
      fetchTrivia(initurl);
    }
    else{
      document.body.innerHTML = '';
      document.body.innerHTML = '<h1>Authentication Unsuccessful, Contact Developer!</h1>';
    }
  });
}
authDomain();


  function fetchTrivia(theURL) {
    fetch(theURL)
      .then(response => response.json())
      .then(data => {
        trivia = data;
        doThing();
      });
  }

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
   }
}
function displayOptions() {
  const currentQnA = trivia.results[0];
const incorrectAnswers = currentQnA.incorrect_answers;
const correctAnswer = currentQnA.correct_answer;
  const Options = [correctAnswer,incorrectAnswers[0],incorrectAnswers[1],incorrectAnswers[2]];
  shuffleOptions(Options);
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  Options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.id = option;
    optionElement.setAttribute('onclick', 'validate("' + option + '")');
    optionElement.innerHTML ='<p>' + option + '</p>';
    optionsDiv.appendChild(optionElement);
  });
}
  function validate(answer){
  const validateQ = trivia.results[0];
const theClue = validateQ.correct_answer;
  if (answer == theClue){
    document.getElementById(answer).style.backgroundColor = "#05e035";
    document.getElementById(answer).style.color = "#ffffff";
    document.getElementById('tBox').style.boxShadow = "0px 0px 10px #05e035";
    generateQuestion();

  } else {
    document.getElementById(answer).style.backgroundColor = "#e00543";
    document.getElementById(answer).style.color = "#ffffff";
    document.getElementById(answer).style.opacity = "0.5";

    document.getElementById('tBox').style.boxShadow = "none";
    document.getElementById('tBox').style.boxShadow = "0px 0px 10px #e00543";
  }
  }
  function doThing() {
    const currentQn = trivia.results[0];
    const currentCategory = currentQn.category;
    const difficulty = currentQn.difficulty;
    const theQn = currentQn.question;
    const displayQn = document.getElementById('theQn');
    displayQn.innerHTML = '<p>' + theQn + '</p>';
    const displayDi = document.getElementById('difficulty');
    const displayGe = document.getElementById('genre');
    displayDi.textContent = difficulty;
    displayGe.textContent = currentCategory;
    displayOptions()
  }

    

function generateQuestion() {
  document.getElementById('tBox').style.boxShadow = "0px 0px 10px #e5e5e5";
  const ucat = document.getElementById('ucat').value;
  const udiff = document.getElementById('udiff').value;
  const baseUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
  const qcat = '&category=' + ucat;
  const qdiff = '&difficulty=' + udiff;
  theURL = baseUrl + qcat + qdiff;
  fetchTrivia(theURL)
}

