/*--------------Constants--------------*/

/*----------Variables (state)----------*/

let turn, winner, keyPressed, isFinalJeopardy
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
const centerAnswerEl = document.getElementById('a2')
const clueEl = document.querySelector('.clue')
const twoEl = document.querySelectorAll('.two')
const messageEl = document.querySelector('.message')
const nameOneEl = document.querySelector('.player-one-name')
const nameOneInput = document.querySelector('input[type=name-text-one]')
const nameTwoEl = document.querySelector('.player-two-name')
const nameTwoInput = document.querySelector('input[type=name-text-two]')
const scoreOneEl = document.querySelector('.player-one-score')
const scoreTwoEl = document.querySelector('.player-two-score')
const ruleMsg = document.querySelector('.rules')
const ruleBtn = document.querySelector('#rules')
const wagerContainer = document.querySelector('.wager-container')

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

nameOneInput.addEventListener('keydown', namePlayerOne)
ruleBtn.addEventListener('click', closeRules)

/*--------------Functions--------------*/

init()

function closeRules() {
  ruleMsg.style.visibility = 'hidden'
  nameOneInput.focus()
}

function init() {
  boardSq[Math.floor(Math.random() * (36 - 18) + 18)].classList.add('daily-double')
  scoreOneEl.innerText = `$${playerOneScore}`
  scoreTwoEl.innerText = `$${playerTwoScore}`
  turn = 1
  isFinalJeopardy = false
  messageEl.innerText = `Input Player Names Above`
  console.log(document.getElementsByClassName('daily-double'))
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
  nameOneEl.innerText = e.target.value
  nameTwoInput.addEventListener('keydown', namePlayerTwo)
  nameTwoInput.focus()
  }
}

function namePlayerTwo(e) {
  if (e.key === 'Enter') {
    nameTwoEl.innerText = e.target.value
    messageEl.innerText = `${nameOneEl.innerText}, select a clue!`
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
      e.target.classList.contains(`one`)
    ? 0
    : e.target.classList.contains(`two`)
    ? 1
    : e.target.classList.contains(`three`)
    ? 2
    : e.target.classList.contains(`four`)
    ? 3
    : e.target.classList.contains(`five`)
    ? 4
    : 5
  if (clickedIdx > 5) {
    if (e.target.classList.contains('clicked')) {
      return
    }
    if (e.target.classList.contains(`daily-double`)) {
      clueEl.innerText = `DAILY DOUBLE`
      clueEl.classList.add(`daily-double-message`)
      wagerContainer.innerHTML = `<div class="daily-double-wager">$ <input type="text" placeholder="Make your wager!"></div>`
      wagerContainer.addEventListener('keydown', commenceDailyDouble)

      function commenceDailyDouble(e){
        if (e.key === 'Enter') {
          // boardAns[0].id = parseInt(e.target.value)
          // boardAns[1].id = parseInt(e.target.value)
          // boardAns[2].id = parseInt(e.target.value)
          dailyWager = parseInt(e.target.value)
          messageEl.innerText = ''
          boardSq[clickedIdx].innerText = null
          boardSq[clickedIdx].classList.add('clicked')
          clueEl.classList.remove(`daily-double-message`)
          clueEl.innerText = `${(catEl[clickedCat][clickedVal].clue.toUpperCase())}`
          boardAns[0].innerText = `${(catEl[clickedCat][clickedVal].response)}`
          boardAns[0].className = `response`
          boardAns[1].innerText = `${(catEl[clickedCat][clickedVal].wrongOne)}`
          boardAns[1].className = `wrong-one`
          boardAns[2].innerText = `${(catEl[clickedCat][clickedVal].wrongTwo)}`
          boardAns[2].className = `wrong-two`
          boardAns.sort(() => Math.random() - 0.5)
          wagerContainer.innerHTML = ``
          answerBoardEl.removeEventListener('click', answerSelect)
          answerBoardEl.addEventListener('click', doubleAnswerSelect)
        }
      }
    } else if (boardSq[clickedIdx] !== null && boardSq[clickedIdx]) {
      messageEl.innerText = ''
      boardSq[clickedIdx].innerText = null
      boardSq[clickedIdx].classList.add('clicked')
      clueEl.innerText = `${(catEl[clickedCat][clickedVal].clue.toUpperCase())}`
      boardAns[0].innerText = `${(catEl[clickedCat][clickedVal].response)}`
      boardAns[0].className = `response`
      boardAns[0].id = `${(catEl[clickedCat][clickedVal].value)}`
      boardAns[1].innerText = `${(catEl[clickedCat][clickedVal].wrongOne)}`
      boardAns[1].className = `wrong-one`
      boardAns[1].id = `${(catEl[clickedCat][clickedVal].value)}`
      boardAns[2].innerText = `${(catEl[clickedCat][clickedVal].wrongTwo)}`
      boardAns[2].className = `wrong-two`
      boardAns[2].id = `${(catEl[clickedCat][clickedVal].value)}`
      boardAns.sort(() => Math.random() - 0.5)

    }
  } 
e.target.removeEventListener('click', clueSelect)
boardEl.removeEventListener('click', clueSelect)
document.addEventListener('keydown', buzz)
render();
}

function buzz(e) {
  messageEl.innerText = ``
  if (e.key === 'a') {
    turn = 1
    messageEl.innerText = `${nameOneEl.innerText}, select answer!`
  } else if (e.key === 'l') {
    turn = -1
    messageEl.innerText = `${nameTwoEl.innerText}, select answer!`
  }
  document.removeEventListener('keydown', buzz)
  answerBoardEl.addEventListener('click', answerSelect)
} 

function answerSelect(e) {
  if (e.target.classList.contains(`response`)) {
    boardAns[0].innerText = ``
    boardAns[1].innerText = ``  
    boardAns[2].innerText = ``  
    if (turn === 1) {
      playerOneScore = playerOneScore+(parseInt(e.target.id.substring(1)))
      scoreOneEl.innerText = `$${playerOneScore}`
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      playerTwoScore = playerTwoScore+(parseInt(e.target.id.substring(1)))
      scoreTwoEl.innerText = `$${playerTwoScore}`
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    }
  } else {
    console.log(`incorrect`)
    if (turn === 1) {
      playerOneScore = playerOneScore-(parseInt(e.target.id.substring(1)))
      scoreOneEl.innerText = `$${playerOneScore}`
      turn = -1
      messageEl.innerText = `${nameTwoEl.innerText}, select answer!`
    } else if (turn === -1) {
      playerTwoScore = playerTwoScore-(parseInt(e.target.id.substring(1)))
      scoreTwoEl.innerText = `$${playerTwoScore}`
      turn = 1
      messageEl.innerText = `${nameOneEl.innerText}, select answer!`
    }
    answerBoardEl.classList.add(`${e.target.className}`)
  }
  if (answerBoardEl.classList.contains('wrong-two') && answerBoardEl.classList.contains('wrong-one')) {
    answerBoardEl.removeEventListener('click', answerSelect)
    if (turn === 1) {
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    }
    boardAns[0].innerText = ``
    boardAns[1].innerText = ``
    boardAns[2].innerText = ``
    return
  }
  render()
  if (scoreOneEl.innerText.includes(`-`)) {
    scoreOneEl.style.color = `red`
  } else {
    scoreOneEl.style.color = `white`
  }
  if (scoreTwoEl.innerText.includes(`-`)) {
    scoreTwoEl.style.color = `red`
  } else {
    scoreTwoEl.style.color = `white`
  }
}

function doubleAnswerSelect(e) {
  if (e.target.classList.contains(`response`)) {
    boardAns[0].innerText = ``
    boardAns[1].innerText = ``
    boardAns[2].innerText = ``
    console.log(`correct`)
    if (turn === 1) {
      playerOneScore = playerOneScore+dailyWager
      scoreOneEl.innerText = `$${playerOneScore}`
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      playerTwoScore = playerTwoScore+dailyWager
      scoreTwoEl.innerText = `$${playerTwoScore}`
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    }
  } else {
    console.log(`incorrect`)
    if (turn === 1) {
      playerOneScore = playerOneScore-dailyWager
      scoreOneEl.innerText = `$${playerOneScore}`
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      playerTwoScore = playerTwoScore+dailyWager
      scoreTwoEl.innerText = `$${playerTwoScore}`
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
  }
  render()
  if (scoreOneEl.innerText.includes(`-`)) {
    scoreOneEl.style.color = `red`
  } else {
    scoreOneEl.style.color = `white`
  }
  if (scoreTwoEl.innerText.includes(`-`)) {
    scoreTwoEl.style.color = `red`
  } else {
    scoreTwoEl.style.color = `white`
  }
}
answerBoardEl.removeEventListener('click', doubleAnswerSelect)
}