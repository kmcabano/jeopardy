/*--------------Constants--------------*/

/*----------Variables (state)----------*/

let turn, winner
let isFinalJeopardy = false
  // 1.2 An array for the multiple choice reponses to appear in

  // 1.5 Player score

  // 1.7 empty FJ wager

  // 1.8 empty FJ reponses

/*------Cached Element References------*/

const bodyEl = document.querySelector('body')
const squaresEl = document.querySelectorAll(".squares")
let boardSq = [... squaresEl]
const boardEl = document.querySelector('.board')
const clueEl = document.querySelector('.clue')
const twoEl = document.querySelectorAll('.two')
const messageEl = document.querySelector('.message')
 // 2.2 Status - whose turn, game over, etc.

  // 2.5 Input boxes
    // 2.5.1 Wager for final jeopardy and for daily double(s)
    // 2.5.2 Player names

  // 2.6 Final Jeopardy timer

  // 2.7 Final Jeopardy category
  
  // 2.8 Buzzer

  // 2.9 Buttons

  // 2.10 Player scores (dollars)

  // 2.11 An element for the Daily Double

  // 2.12 final jeopardy responses

/*-----------Event Listeners-----------*/

boardEl.addEventListener('click', handleClick)

/*--------------Functions--------------*/

init()

function init() {
  boardSq[Math.floor(Math.random() * (36 - 18) + 18)].classList.add('daily-double')
  console.log(document.querySelector('#daily-double'))
}

function render() {

}

function handleClick(e) {
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
      boardSq[clickedIdx].innerText = null
      boardSq[clickedIdx].classList.add('clicked')
      clueEl.innerText = `${(catEl[clickedCat][clickedVal].clue)}`
    }
  } 
e.target.removeEventListener('click', handleClick)
render();
}
