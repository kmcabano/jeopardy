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

/*-----------Event Listeners-----------*/

boardEl.addEventListener('click', handleClick)

/*--------------Functions--------------*/

function render(){

}

function handleClick(e) {
  let catEl = [catA, catB, catC, catD, catE, catF]
	const clickedIdx = e.target.id.slice(2)
  if (clickedIdx > 5 && clickedIdx < 12) {
    var clickedVal = 0
  }
  if (clickedIdx > 11 && clickedIdx < 18) {
    var clickedVal = 1
  }
  if (clickedIdx > 17 && clickedIdx < 24) {
    var clickedVal = 2
  }
  if (clickedIdx > 23 && clickedIdx < 30) {
    var clickedVal = 3
  }
  if (clickedIdx > 29 && clickedIdx < 36) {
    var clickedVal = 4
  }
  if (e.target.className.substring(8) === `one`) {
    var clickedCat = 0
  }
  if (e.target.className.substring(8) === `two`) {
    var clickedCat = 1
  }
  if (e.target.className.substring(8) === `three`) {
    var clickedCat = 2
  }
  if (e.target.className.substring(8) === `four`) {
    var clickedCat = 3
  }
  if (e.target.className.substring(8) === `five`) {
    var clickedCat = 4
  }
  if (e.target.className.substring(8) === `six`) {
    var clickedCat = 5
  }
  if (clickedIdx > 5) {
    if (boardSq[clickedIdx] !== null) {
      boardSq[clickedIdx].innerText = null
      clueEl.innerText = `${(catEl[clickedCat][clickedVal].clue)}`
    }
  } 
render();
}
