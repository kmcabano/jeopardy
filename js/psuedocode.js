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