function fetchTrivia(theURL) {
    fetch(theURL)
      .then(response => response.json())
      .then(data => {
        trivia = data;
        // var currqn = trivia.results;
        console.log(trivia.results[0]);
        doThing();
      });
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
function shuffleOptions(options) {


  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
    // console.log(j);


   }
  // console.log(j);
}

function displayOptions() {
  const currentQnA = trivia.results[0];
const incorrectAnswers = currentQnA.incorrect_answers;
const correctAnswer = currentQnA.correct_answer;
  const Options = [correctAnswer,incorrectAnswers[0],incorrectAnswers[1],incorrectAnswers[2]];
  // console.log(allOptions)
  shuffleOptions(Options);
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  console.log(Options);
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
    console.log("Correct Answer");
    document.getElementById(answer).style.backgroundColor = "#05e035";
    document.getElementById(answer).style.color = "#ffffff";

    document.getElementById('tBox').style.boxShadow = "0px 0px 10px #05e035";
    
    generateQuestion();

  } else {
    console.log("Incorrect!");
    document.getElementById(answer).style.backgroundColor = "#e00543";
    document.getElementById(answer).style.color = "#ffffff";
    document.getElementById('tBox').style.boxShadow = "none";

    document.getElementById('tBox').style.boxShadow = "0px 0px 10px #e00543";


    
  }
  }
//   fetchMessages();
  function doThing() {

    const currentQn = trivia.results[0];
    const currentCategory = currentQn.category;

    const difficulty = currentQn.difficulty;
    const theQn = currentQn.question;
    console.log(currentCategory);
    console.log(difficulty);
    console.log(theQn);
    const displayQn = document.getElementById('theQn');
    displayQn.innerHTML = '<p>' + theQn + '</p>';
    const displayDi = document.getElementById('difficulty');
    const displayGe = document.getElementById('genre');
    displayDi.textContent = difficulty;
    displayGe.textContent = currentCategory;
    displayOptions()
  }
  window.addEventListener("load",() => 
   {
    const initurl = "https://opentdb.com/api.php?amount=1&type=multiple";
    fetchTrivia(initurl);
  })