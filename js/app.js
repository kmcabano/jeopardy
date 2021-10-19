/*--------------Constants--------------*/

/*----------Variables (state)----------*/

let turn, winner, keyPressed
let isFinalJeopardy = false
let playerOneScore = 0
let playerTwoScore = 0
  // 1.2 An array for the multiple choice reponses to appear in

  // 1.5 Player score

  // 1.7 empty FJ wager

  // 1.8 empty FJ reponses

/*------Cached Element References------*/

const bodyEl = document.querySelector('body')
const squaresEl = document.querySelectorAll(".squares")
let boardSq = [... squaresEl]
const boardEl = document.querySelector('.board')
const answersEl = document.querySelectorAll('.answer')
let boardAns = [... answersEl]
const answerBoardEl = document.querySelector('.answer-board')
const clueEl = document.querySelector('.clue')
const twoEl = document.querySelectorAll('.two')
const messageEl = document.querySelector('.message')
const nameOneEl = document.querySelector('.player-one-name')
const nameOneInput = document.querySelector('input[type=name-text-one]')
const nameTwoEl = document.querySelector('.player-two-name')
const nameTwoInput = document.querySelector('input[type=name-text-two]')
const scoreOneEl = document.querySelector('.player-one-score')
const scoreTwoEl = document.querySelector('.player-two-score')


 // 2.2 Status - whose turn, game over, etc.

  // 2.5 Input boxes
    // 2.5.1 Wager for final jeopardy and for daily double(s)
    // 2.5.2 Player names

  // 2.6 Final Jeopardy timer

  // 2.7 Final Jeopardy category
  
  // 2.8 Buzzer

  // 2.9 Buttons

  // 2.11 An element for the Daily Double

  // 2.12 final jeopardy responses

/*----------------Audio----------------*/

/*-----------Event Listeners-----------*/

boardEl.addEventListener('click', clueSelect)
answerBoardEl.addEventListener('click', answerSelect)
document.addEventListener('keydown', buzz)
nameOneInput.addEventListener('keydown', namePlayerOne)
nameTwoInput.addEventListener('keydown', namePlayerTwo)

/*--------------Functions--------------*/

init()

function init() {
  boardSq[Math.floor(Math.random() * (36 - 18) + 18)].classList.add('daily-double')
  scoreOneEl.innerText = `$${playerOneScore}`
  scoreTwoEl.innerText = `$${playerTwoScore}`
  turn = null
  messageEl.innerText = `Input Player Names Above`
  boardEl.removeEventListener('click', clueSelect)
  nameTwoInput.removeEventListener('keydown', namePlayerTwo)
  // 4.1 Initialize function
    // 4.1.1 Array of 36 elements mapped to the board
      // 4.1.1.1 index 0-5 will contain category names, 6-11 "$100", 12-17 "$200", etc. for the appropriate amounts
      // 4.1.1.2 call a function that randomly assigns one element at index 6-35 the class of "daily-double"
    // 4.1.2 Status will display a welcome message
    // 4.1.3 Initialize winner variable to null
    // 4.1.4 Initialize player scores to $0
    // 4.1.5 Initialize FJ variable to false
    // 4.1.6 Display a message for player 1 to select the first clue
    // 4.1.7 Initialize clue to null
    // 4.1.7 Call render function
}

function render() {
  // 4.2 Render function
    // 4.2.1 Loop over board array, change content of items as needed according to their updated values
      // For example, the submit answer function that will run when an answer is clicked will empty the element if the response was correct, so the box will then display blank
    // 4.2.2 Loop over reponses array, change content as needed according to their update values
    // 4.2.3 Display whatever string is contained in the clue box const as text
    // 4.2. Message(s)
    // 4.2. Update each player's scores to display their variable's value as text
    // 4.2. check for Final Jeopardy - do nothing if false, call Final Jeopardy init if true
}

function namePlayerOne(e) {
  if (e.key === 'Enter') {
  nameOneEl.textContent = e.target.value
  nameTwoInput.addEventListener('keydown', namePlayerTwo)
  nameTwoInput.focus()
  }
}

function namePlayerTwo(e) {
  if (e.key === 'Enter') {
    nameTwoEl.textContent = e.target.value
    messageEl.textContent = 'Player 1, select a clue!'
    boardEl.addEventListener('click', clueSelect)
  }
}

function clueSelect(e) {
  let catEl = [catA, catB, catC, catD, catE, catF]
	const clickedIdx = e.target.id.slice(2)
  let clickedVal =
      clickedIdx > 5 && clickedIdx < 12
    ? 0
    : clickedIdx > 11 && clickedIdx < 18
    ? 1
    : clickedIdx > 17 && clickedIdx < 24
    ? 2
    : clickedIdx > 23 && clickedIdx < 30
    ? 3
    : 4
  let clickedCat =
      e.target.className.substring(8) === `one`
    ? 0
    : e.target.className.substring(8) === `two`
    ? 1
    : e.target.className.substring(8) === `three`
    ? 2
    : e.target.className.substring(8) === `four`
    ? 3
    : e.target.className.substring(8) === `five`
    ? 4
    : 5
  if (clickedIdx > 5) {
    if (e.target.classList.contains('clicked')) {
      return
    }
    if (e.target.classList.contains(`daily-double`)) {
      boardSq[clickedIdx].innerText = null
      boardSq[clickedIdx].classList.add('clicked')
      messageEl.innerText = `Daily Double!`
    } else if (boardSq[clickedIdx] !== null && boardSq[clickedIdx]) {
      messageEl.innerText = ''
      boardSq[clickedIdx].innerText = null
      boardSq[clickedIdx].classList.add('clicked')
      clueEl.innerText = `${(catEl[clickedCat][clickedVal].clue.toUpperCase())}`
      boardAns[0].innerText = `${(catEl[clickedCat][clickedVal].response)}`
      boardAns[0].className = `response`
      boardAns[1].innerText = `${(catEl[clickedCat][clickedVal].wrongOne)}`
      boardAns[1].className = `wrong-one`
      boardAns[2].innerText = `${(catEl[clickedCat][clickedVal].wrongTwo)}`
      boardAns[2].className = `wrong-two`
      boardAns.sort(() => Math.random() - 0.5)
    }
  } 
e.target.removeEventListener('click', clueSelect)
render();
}

function buzz(e) {
  if (e.key === 'a') {
    turn = 1
  } else if (e.key === 'l') {
    turn = -1
  } // console.log(turn)
} 

function answerSelect(e) {
  if (e.target.classList.contains(`response`)) {
    console.log(`correct`)
  } else {
    console.log(`No, dummy`)
  }
}
// 6.1.4 If the clue selected has the class "daily-double", call the daily double function
      // 6.1.4.1 Play daily double sound
      // 6.1.4.2 Display input box and submit button for wager
      // 6.1.4.3 After that's submitted, the clue is displayed along with the answer choices - no turn variable is assigned this time
      // 6.1.4.4 If answered correctly, add the wager amount to the player's score, clear the clue and reponses, and call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.1.4.5 If answered incorrectly, add the wager amount to the player's score, clear the clue and reponses, and call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.1.4.6 Display a message that it is the same player's turn to select the next clue