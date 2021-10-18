

// 3. Store audio files

  // 3.1 Maybe a buzzer beep?

  // 3.2 Daily double sound

  // 3.3 Final jeopardy song

  // 3.4 Maybe applause sounds

// 4. Startup

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

  // 4.2 Render function
    // 4.2.1 Loop over board array, change content of items as needed according to their updated values
      // For example, the submit answer function that will run when an answer is clicked will empty the element if the response was correct, so the box will then display blank
    // 4.2.2 Loop over reponses array, change content as needed according to their update values
    // 4.2.3 Display whatever string is contained in the clue box const as text
    // 4.2. Message(s)
    // 4.2. Update each player's scores to display their variable's value as text
    // 4.2. check for Final Jeopardy - do nothing if false, call Final Jeopardy init if true
  

// 6. Include event listener(s)

  // 6.1 Selection of clues
    // 6.1.1 take index of clicked square
    // 6.1.2 return if that index is empty (clue already answered)
    // 6.1.3 call clue in string form to clue box element
    // 6.1.4 If the clue selected has the class "daily-double", call the daily double function
      // 6.1.4.1 Play daily double sound
      // 6.1.4.2 Display input box and submit button for wager
      // 6.1.4.3 After that's submitted, the clue is displayed along with the answer choices - no turn variable is assigned this time
      // 6.1.4.4 If answered correctly, add the wager amount to the player's score, clear the clue and reponses, and call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.1.4.5 If answered incorrectly, add the wager amount to the player's score, clear the clue and reponses, and call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.1.4.6 Display a message that it is the same player's turn to select the next clue

  // 6.2 Buzzer keys for each player
    // 6.2.1 Each player will have 1 key to serve as their buzzer, maybe A and L because they are on opposite sides of the keyboard
    // 6.2.2 Whichever key is pressed first will set the turn value
  
  // 6.3 Selection of reponses
    // 6.3.1 Take index of selected answer, compare its content to the correct reponse
    // 6.3.2 If an incorrect response is selected (i.e. does not match), mark it as such and
      // 6.3.2.1 If it's the first time, subtract the dollar amount from the player's score and change turn to the other player  
      // 6.3.2.2 If it's the second time, subtract the dollar amount from that player's score, clear the clue and reponses, then call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.3.2.3 Display message that it's the player who selected the clue's turn to do so again
    // 6.3.3 If the correct reponse is selected, add the dollar amount to the player's score, clear the clue and reponses, and call for a new clue to be selected if there are still clue values in the array/on the board
      // 6.3.3.1 Display a message that the player who answered correctly will pick the next clue
    // 6.3.4 if board array indexes 6-35 are blank (i.e. all clues have been answered), assign final jeopardy a value of true (see section 7)
  
  // 6.4 Buttons
    // 6.4.1 Light/dark mode toggle
    // 6.4.2 FJ & DD wager submission
      // 6.4.2.1 Collects the amount entered in the text box
    // 6.4.3 Begin FJ timer
    // 6.4.4 check FJ winner

  // 6.5 Call render function in each


// 7. Final jeopardy sequence functions, to be called when final jeopardy = true

  // 7.1 a new finalJEopardyInit function will be called
    // 7.1.1 Remove the board
    // 7.1.2 initialize message to say "Final Jeopardy"
    // 7.1.3 display wager input text boxes/submit buttons
    // 7.1.4 assign FJ category, clue, and responses to their respective elements (these remain hidden)
    // 7.1.5 initialize turn to null
    // 7.1.6 new event listener for FJ answering
    // 7.1.7 the finalJeopardyRender function will be called
  
  // 7.2 final jeopardy render function
    // basically a copy of the other render function, just specific to these FJ elements
  
  // 7.3 After wager for each player is submitted:
    // 7.3.1 button to start the timer will appear
    // 7.3.2 category element will be displayed 
    // 7.3.3 message will remind players to look away while other answers
    // 7.3.4 store those wagers as the dollar amount for the clue
    // 7.3.5 FJ render

  // 7.3 When timer start is pressed:
    // 7.3.1 the clue will display, timer will start, song plays
    // 7.3.2 display reponse choices
    // 7.3.3 set turn to player 1
      // 7.3.3.1 event listener for selected reponse
        // 7.3.3.1.1 answer variable is updated with selected response
        // 7.3.3.1.2 if correct, wager is added to score, if incorrect or time runs out, wager subtracted
        // 7.3.3.1.3 turn is changed to player 2
        // 7.3.3.1.4 timer and song restart
    // 7.3.4 player 2's turn
      // 7.3.4.1 event listener for response
        // 7.3.4.1.1 answer is updated with response
        // 7.3.4.1.2 score updated like for player 1's, same subtraction if timer runs out as well
        // 7.3.4.1.3 display check winner button

  // 7.4 when check winner button is clicked, check winner function is called
    // 7.4.1 each player's wagers and answers will be displayed
    // 7.4.2 player scores will be rendered, therefore updated on the screen
    // 7.4.3 the two scores must be compared
    // 7.4.4 the winner variable will be updated with the value of the player with the higher score
      // 7.4.4.1 if the scores are equal, variable will be updated to tie
        // 7.4.4.1.1 tie message will be displayed
    // 7.4.5 the isWinner function will then be called
      // 7.4.5.1 a congratulations message will appear for the winning player, determined by the value of the winner variable
      // 7.4.5.2 applause sound, animation, etc.
    // 7.4.6 rendering for this function will be written into it or written and called as another function





// Future ideas to be implemented after this version of the game is complete
  // Create the Double Jeopardy round before final jeopardy - reinitialize board with new clues, double dollar amounts, and another daily double
  // Eliminate multiple choice - find a way to process typed responses, maybe if a reponse contains a certain keyword or keywords it would be declared correct?
  // Add a third player option
  // Create a huge database of categories, and make the initialize function call a random selection of those 6 categories to the board, making each game unique
    // Or alternately, database every recorded jeopardy game, allowing ANY game to be called either randomly or by air date! This would be a....daunting task.
    // Will add a "new game" button