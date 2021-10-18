/*--------------Constants--------------*/

/*----------Variables (state)----------*/

let turn, winner
let isFinalJeopardy = false

/*------Cached Element References------*/

const bodyEl = document.querySelector('body')
const squaresEl = document.querySelectorAll(".squares")
let boardSq = [... squaresEl]
const boardEl = document.querySelector('.board')
const clueEl = document.querySelector('.clue')
const twoEl = document.querySelectorAll('.two')
const messageEl = document.querySelector('.message')

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
