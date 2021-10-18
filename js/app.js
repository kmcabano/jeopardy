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

/*-----------Event Listeners-----------*/

boardEl.addEventListener('click', handleClick)

/*--------------Functions--------------*/

function handleClick(e) {
	const clickedIdx = e.target.id.slice(2)
  if (clickedIdx > 5) {
    if (boardSq[clickedIdx] !== null) {
      boardSq[clickedIdx].innerText = ''
    }
  }	
	render();
}