const bodyEl = document.querySelector('body')
const squaresEl = document.querySelectorAll(".squares")
const boardEl = document.querySelector('.board')
const answersEl = document.querySelectorAll('.answer')
const answerBoardEl = document.querySelector('.answer-board')
const clueEl = document.querySelector('.clue')
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
const finalWagerOneInput = document.querySelector('input[type="text-wager-one')
const finalWagerTwoInput = document.querySelector('input[type="text-wager-two')
const finalWagerOneResult = document.querySelector('.player-one-wager')
const finalWagerTwoResult = document.querySelector('.player-two-wager')
const timerDisplay = document.querySelector('.timer')
const bigFinal = document.querySelector('.fjf')
const bigJeopardy = document.querySelector('.fjj')
const finalClueEl = document.querySelector('.fjc')
const lightDarkBtn = document.querySelector('#dark')

let turn, winner, keyPressed, isFinalJeopardy, finalOneAmt, finalTwoAmt, finalOneResp, finalTwoResp
let playerOneScore = 0
let playerTwoScore = 0
let boardSq = [... squaresEl]
let boardAns = [... answersEl]

nameOneInput.addEventListener('keydown', namePlayerOne)
ruleBtn.addEventListener('click', closeRules)
lightDarkBtn.addEventListener('click', toggleLightDark)

const finalSong = new Audio('../audio/final-jeopardy.mp3')
const correctSound = new Audio('../audio/correct-answer.mp3')
const wrongSound = new Audio ('../audio/wrong-answer.mp3')
const dailyDoubleSound = new Audio('../audio/daily-double.mp3')

init()

function toggleLightDark() {
  bodyEl.className = bodyEl.className === "dark" ? "" : "dark"
}

function closeRules() {
  ruleMsg.style.visibility = 'hidden'
  nameOneInput.focus()
}

function init() {
  boardSq[Math.floor(Math.random() * (36 - 18) + 18)].classList.add('daily-double')
  scoreOneEl.innerText = `$${playerOneScore}`
  scoreTwoEl.innerText = `$${playerTwoScore}`
  winner = null
  turn = 1
  isFinalJeopardy = false
  messageEl.innerText = `Input Player Names Above`
  console.log(document.getElementsByClassName('daily-double'))
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
      boardAns[0].style.color =  'white'
      boardAns[1].style.color =  'white'
      boardAns[2].style.color =  'white'
      boardAns[0].innerText =  ''
      boardAns[1].innerText =  ''
      boardAns[2].innerText =  ''
      clueEl.innerText = `DAILY DOUBLE`
      clueEl.classList.add(`daily-double-message`)
      dailyDoubleSound.play()
      wagerContainer.innerHTML = `<div class="daily-double-wager">$ <input type="text" placeholder="Make your wager!"></div>`
      wagerContainer.addEventListener('keydown', commenceDailyDouble)
      function commenceDailyDouble(e){
        if (e.key === 'Enter') {
          if (turn === 1) {
            if (playerOneScore < 1000 && e.target.value > 1000) {
              messageEl.innerText = `You may only wager up to $1000!`
              return
            } else if (e.target.value > playerOneScore && playerOneScore > 1000) {
              messageEl.innerText = `You may only wager up to $${playerOneScore}!`
              return
            }
          } else if (turn === -1) {
            if (playerTwoScore < 1000 && e.target.value > 1000) {
              messageEl.innerText = `You may only wager up to $1000!`
              return
            } else if (turn === -1) {
              if (e.target.value > playerTwoScore && playerTwoScore > 1000) {
                messageEl.innerText = `You may only wager up to $${playerTwoScore}!`
                return
              }
            }
          }
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
      boardAns[0].style.color =  'white'
      boardAns[1].style.color =  'white'
      boardAns[2].style.color =  'white'
      messageEl.innerText = ''
      boardSq[clickedIdx].innerText = null
      boardSq[clickedIdx].classList.add('clicked')
      answerBoardEl.classList.remove('response')
      answerBoardEl.classList.remove('wrong-one')
      answerBoardEl.classList.remove('wrong-two')
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
      document.addEventListener('keydown', buzz)
    }
  } 
e.target.removeEventListener('click', clueSelect)
boardEl.removeEventListener('click', clueSelect)
}

function buzz(e) {
  messageEl.innerText = ``
  if (e.key === 'a') {
    turn = 1
    messageEl.innerText = `${nameOneEl.innerText}, select answer!`
  } else if (e.key === 'l') {
    turn = -1
    messageEl.innerText = `${nameTwoEl.innerText}, select answer!`
  } else {
    return
  }
  document.removeEventListener('keydown', buzz)
  answerBoardEl.addEventListener('click', answerSelect)
} 

function answerSelect(e) {
  if (e.target.classList.contains(`response`)) {
    boardAns[0].innerText = ``
    boardAns[1].innerText = ``  
    boardAns[2].innerText = ``  
    e.target.style.color = '#32cd32'
    e.target.innerText = 'CORRECT!'
    correctSound.play()
    if (turn === 1) {
      playerOneScore = playerOneScore+(parseInt(e.target.id.substring(1)))
      scoreOneEl.innerText = `$${playerOneScore}`
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      answerBoardEl.removeEventListener('click', answerSelect)
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      playerTwoScore = playerTwoScore+(parseInt(e.target.id.substring(1)))
      scoreTwoEl.innerText = `$${playerTwoScore}`
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      answerBoardEl.removeEventListener('click', answerSelect)
      boardEl.addEventListener('click', clueSelect)
    }
  } else if (e.target.classList.contains('wrong-one') || e.target.classList.contains('wrong-two')) {
    e.target.style.color = 'red'
    e.target.innerText = 'INCORRECT'
    wrongSound.play()
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
    e.target.style.color = 'red'
    e.target.innerText = 'INCORRECT'
    wrongSound.play()
    document.querySelector('.response').style.color = '#32cd32'
    if (turn === 1) {
      messageEl.innerText = `${nameOneEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    } else if (turn === -1) {
      messageEl.innerText = `${nameTwoEl.innerText}, select another clue!`
      boardEl.addEventListener('click', clueSelect)
    }
    answerBoardEl.classList.remove('wrong-one')
    answerBoardEl.classList.remove('wrong-two')
  }
  checkFinalJeopardy()
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
    e.target.style.color = '#32cd32'
    e.target.innerText = 'CORRECT!'
    correctSound.play()
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
  } else if (e.target.classList.contains('wrong-one') || e.target.classList.contains('wrong-two')) {
    e.target.style.color = 'red'
    e.target.innerText = 'INCORRECT'
    wrongSound.play()
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
  checkFinalJeopardy()
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
} else {
  return
}
answerBoardEl.removeEventListener('click', doubleAnswerSelect)
}

function checkFinalJeopardy() {
  // const clueSq = boardSq.slice(6)
  const clueSq = boardSq.slice(6, 7)
  if (clueSq.every((sq) => sq.classList.contains(`clicked`))) {
    isFinalJeopardy = true
    setUpFinalJeopardy()
  } else {
    isFinalJeopardy = false
    return
  }
  checkWinner()
}

function setUpFinalJeopardy() {
  if (scoreOneEl.innerText.includes('-')) {
    winner = -1
    checkWinner()
  } else if (scoreTwoEl.innerText.includes('-')) {
    winner = 1
    checkWinner()
  } else {
    boardEl.innerHTML = '<div class="fjf">FINAL</div><div class ="fjj">JEOPARDY!</div><div class="fjc></div>'
    boardEl.className = 'final-jeopardy-board'
    messageEl.innerText = 'Make your wagers!'
    document.querySelector('.final-jeopardy-wager').style.zIndex = '1'
    finalWagerOneInput.placeholder = `${nameOneEl.innerText}'s wager`
    finalWagerTwoInput.placeholder = `${nameTwoEl.innerText}'s wager`
    boardAns[0].innerText = ``
    boardAns[1].innerText = ``
    boardAns[2].innerText = ``
    finalWagerOneInput.addEventListener('keydown', wagerFinalOne)
    finalWagerOneInput.focus()
  }
}

function wagerFinalOne (e) {
  if (e.key === 'Enter') {
    if (e.target.value > playerOneScore) {
      messageEl.innerText = `You may only wager up to $${playerOneScore}`
      return
    } 
    finalOneAmt = parseInt(e.target.value)
    finalWagerOneResult.innerText = `${nameOneEl.innerText} wagered $${finalOneAmt}`
    finalWagerTwoInput.addEventListener('keydown', wagerFinalTwo)
    finalWagerTwoInput.focus()
  }
}

function wagerFinalTwo(e) {
  if (e.key === 'Enter') {
    if (e.target.value > playerTwoScore) {
      messageEl.innerText = `You may only wager up to $${playerTwoScore}`
      return
    }
    finalTwoAmt = parseInt(e.target.value)
    finalWagerTwoResult.innerText = `${nameTwoEl.innerText} wagered $${finalTwoAmt}`
    messageEl.innerText = `Category: ${finalJeopardyQuestion.category}`
    timerDisplay.innerText = `START!`
    timerDisplay.addEventListener('click', commenceFinalJeopardy)
  }
}

function commenceFinalJeopardy(){
  startTimer(30)
  finalSong.play()
  boardEl.innerHTML = `<div class="fjc">${finalJeopardyQuestion.clue.toUpperCase()}</div>`
  boardAns[0].style.color =  'white'
  boardAns[1].style.color =  'white'
  boardAns[2].style.color =  'white'
  boardAns[0].innerText = `${finalJeopardyQuestion.response}`
  boardAns[1].innerText = `${finalJeopardyQuestion.wrongOne}`
  boardAns[2].innerText = `${finalJeopardyQuestion.wrongTwo}`
  boardAns[0].className = 'response'
  boardAns[1].className = 'wrong-one'
  boardAns[1].className = 'wrong-two'
  boardAns.sort(() => Math.random() - 0.5)
  console.log(boardAns)
  answerBoardEl.addEventListener('click', finalAnswerSelectOne)
}

function finalAnswerSelectOne(e) {
  if (e.target.classList.contains('response')) {
    playerOneScore = playerOneScore+finalOneAmt
  } else if (e.target.classList.contains('wrong-one') || e.target.classList.contains('wrong-two')) {
    playerOneScore = playerOneScore-finalOneAmt
  }
  answerBoardEl.removeEventListener('click', finalAnswerSelectOne)
  answerBoardEl.addEventListener('click', finalAnswerSelectTwo)
  console.log(playerOneScore)
}

function finalAnswerSelectTwo(e){
  if (e.target.classList.contains('response')) {
    playerTwoScore = playerTwoScore+finalTwoAmt
  } else if (e.target.classList.contains('wrong-one') || e.target.classList.contains('wrong-two')) {
    playerTwoScore = playerTwoScore-finalTwoAmt
  }
  answerBoardEl.removeEventListener('click', finalAnswerSelectTwo)
  console.log(playerTwoScore)
}

function startTimer(sec) {
  let counter = sec
  const interval = setInterval(() => {
    timerDisplay.innerText = `${counter}`
    counter--
    if (counter < 0) {
      clearInterval(interval)
      timerDisplay.innerText = `Time!`
      messageEl.innerHTML = `<div class="reveal">REVEAL</div>`
      document.querySelector('.reveal').addEventListener('click', totalFinal)
    }
  }, 1000)
}

function totalFinal() {
  scoreOneEl.innerText = `$${playerOneScore}`
  scoreTwoEl.innerHTML = `$${playerTwoScore}`
  messageEl.innerText = ``
  boardAns[0].innerText = ``
  boardAns[1].innerText = ``
  boardAns[2].innerText = ``
  if (playerOneScore > playerTwoScore) {
    winner = 1
  } else if (playerTwoScore > playerOneScore) {
    winner = -1
  } else if (playerOneScore === playerTwoScore) {
    winner = tie
  }
  checkWinner()
}

function checkWinner () {
  if (winner === null) {
    return
  } else if (winner === 1) {
    boardEl.innerText = `${nameOneEl.innerText} wins!`
    boardAns[0].innerText = `${nameOneEl.innerText}!!!!`
    boardAns[1].innerText = `${nameOneEl.innerText}!!!!`
    boardAns[2].innerText = `${nameOneEl.innerText}!!!!`
    finalSong.play()
  } else if (winner === -1) {
    boardEl.innerText = `${nameTwoEl.innerText} wins!`
    boardAns[0].innerText = `${nameTwoEl.innerText}!!!!`
    boardAns[1].innerText = `${nameTwoEl.innerText}!!!!`
    boardAns[2].innerText = `${nameTwoEl.innerText}!!!!`
    finalSong.play
  } else if (winner === tie) {
    boardEl.innerText = `It's a tie!`
  }
  boardEl.className = `winner`
}