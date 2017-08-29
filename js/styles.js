// !(function () {
  const startScreenDiv = document.createElement("div");
    startScreenDiv.setAttribute("class", "screen screen-start");
    startScreenDiv.setAttribute("id", "start");
  const startScreenHeader = document.createElement("header");
  const startScreenH1 = document.createElement("h1");
    startScreenH1.textContent = "Tic Tac Toe";
  const startScreenBtn = document.createElement("a");
    startScreenBtn.setAttribute("href", "#");
    startScreenBtn.setAttribute("class", "button");
    startScreenBtn.textContent = "Start game";
  const singlePlayerBtn = document.createElement("a");
    singlePlayerBtn.setAttribute("class", "button");
    singlePlayerBtn.setAttribute("id", "singlePlayer");
    singlePlayerBtn.textContent = "Single Player";
  const multiplayerBtn = document.createElement("a");
    multiplayerBtn.setAttribute("class", "button");
    multiplayerBtn.setAttribute("id", "multiPlayer");
    multiplayerBtn.textContent = "Multiplayer";
  const player1 = document.createElement("input");
    player1.setAttribute("type", "text");
    player1.setAttribute("placeholder", "Player 1's name");
    const player2 = document.createElement("input");
      player2.setAttribute("type", "text");
      player2.setAttribute("placeholder", "Player 2's name");

  const winScreenDiv = document.createElement("div");
    winScreenDiv.setAttribute("class", "screen screen-win");
    winScreenDiv.setAttribute("id", "finish");
  const winScreenMessage = document.createElement("p");
    winScreenMessage.setAttribute("class", "message");
    // winScreenMessage.textContent = "Winner";
  const winScreenHeader = document.createElement("header");
  const winScreenH1 = document.createElement("h1");
    winScreenH1.textContent = "Tic Tac Toe";
  const winScreenBtn = document.createElement("a");
    winScreenBtn.setAttribute("href", "#");
    winScreenBtn.setAttribute("class", "button");
    winScreenBtn.textContent = "New game";

  const tieScreenDiv = document.createElement("div");
    tieScreenDiv.setAttribute("class", "screen screen-start screen-tie");
    tieScreenDiv.setAttribute("id", "tie");
  const tieScreenMessage = document.createElement("p");
    tieScreenMessage.setAttribute("class", "message");
    tieScreenMessage.textContent = "It's a Tie";
  const tieScreenHeader = document.createElement("header");
  const tieScreenH1 = document.createElement("h1");
    tieScreenH1.textContent = "Tic Tac Toe";
  const tieScreenBtn = document.createElement("a");
    tieScreenBtn.setAttribute("href", "#");
    tieScreenBtn.setAttribute("class", "button");
    tieScreenBtn.textContent = "New game";

  const gameBoard = document.querySelector(".boxes");
  const box = gameBoard.querySelectorAll(".box");
  var currentPlayer = "o";
  var movesMade = 0;
  var gameWinner = "";
  var gamePlay;


  function showStartScreen () {
    //put the elements stored in the variables together to build the layout
    startScreenHeader.appendChild(startScreenH1);
    startScreenHeader.appendChild(singlePlayerBtn);
    startScreenHeader.appendChild(multiplayerBtn);
    startScreenDiv.appendChild(startScreenHeader);
    document.querySelector("body").appendChild(startScreenDiv);

    singlePlayerBtn.addEventListener("click", function () {
      gamePlay = "single";
      gameBoard.addEventListener("click", singlePlayerMode);
    });
      multiplayerBtn.addEventListener("click", function () {
      gamePlay = "multi";
      gameBoard.addEventListener("click", multiPlayerMode);
    });

    startScreenBtn.addEventListener("click", function () {
      var player1Name = "<p class='player-name'>" + player1.value + "</p>";
      var player2Name = "<p class='player-name'>" + player2.value + "</p>";
      $(player1Name).insertBefore("#player1 svg");
      $(player2Name).insertBefore("#player2 svg");
      $("#start").remove();
    });
  }

  function showWinScreen (winner, playerName) {
    //put the elements stored in the variables together to build the layout
    winScreenMessage.textContent = playerName + " Wins";
    winScreenHeader.appendChild(winScreenH1);
    winScreenHeader.appendChild(winScreenMessage);
    winScreenHeader.appendChild(winScreenBtn);
    winScreenDiv.appendChild(winScreenHeader);
    winScreenDiv.classList.remove("screen-win-one");
    winScreenDiv.classList.remove("screen-win-two");
    winScreenDiv.classList.add(winner);
    document.querySelector("body").appendChild(winScreenDiv);

    winScreenBtn.addEventListener("click", function () {
      boardReset("#finish");
    });
  }

  function showTieScreen () {
    //put the elements stored in the variables together to build the layout
    tieScreenHeader.appendChild(tieScreenH1);
    tieScreenHeader.appendChild(tieScreenMessage);
    tieScreenHeader.appendChild(tieScreenBtn);
    tieScreenDiv.appendChild(tieScreenHeader);
    document.querySelector("body").appendChild(tieScreenDiv);

    tieScreenBtn.addEventListener("click", function () {
      boardReset("#tie");
    });
  }

  function boardReset (removeScreen) {
    $(".box-filled-1").removeClass("box-filled-1");
    $(".box-filled-2").removeClass("box-filled-2");
    currentPlayer = "o";
    $(removeScreen).remove();
    highlightCurrentPlayer('player1', 'player2');
    movesMade = 0;
    gameWinner = "";
  }

  //highlight the whose turn it is based off current player
  function highlightCurrentPlayer (currentPlayer, nextPlayer) {
    document.getElementById(currentPlayer).classList.add("active");
    document.getElementById(nextPlayer).classList.remove("active");
  }

  function isBlockTaken (targetEvt) {
    if (targetEvt.classList.contains("box-filled-1") || targetEvt.classList.contains("box-filled-2")) {
      return true;
    } else {
      return false;
    }
  }

  function makeMove (targetEvt, currentPlayerFill, nextPlayer) {
    //if black is taken, alert move cannot be made
    if(isBlockTaken(targetEvt) === true){
      alert("Square is already taken.");
    //else make the players move
    } else {
      targetEvt.classList.add(currentPlayerFill);
      currentPlayer = nextPlayer;
      movesMade++;
      if (currentPlayer === "o") {
        highlightCurrentPlayer('player1', 'player2');
      } else if (currentPlayer === "x") {
        highlightCurrentPlayer('player2', 'player1');
      }
    }
  }

  function forTheWin (currentPlayerFill, currentPlayer) {
    if (box[0].classList.contains(currentPlayerFill) &&
        box[1].classList.contains(currentPlayerFill) &&
        box[2].classList.contains(currentPlayerFill) ||
        box[3].classList.contains(currentPlayerFill) &&
        box[4].classList.contains(currentPlayerFill) &&
        box[5].classList.contains(currentPlayerFill) ||
        box[6].classList.contains(currentPlayerFill) &&
        box[7].classList.contains(currentPlayerFill) &&
        box[8].classList.contains(currentPlayerFill) ||
        box[0].classList.contains(currentPlayerFill) &&
        box[3].classList.contains(currentPlayerFill) &&
        box[6].classList.contains(currentPlayerFill) ||
        box[1].classList.contains(currentPlayerFill) &&
        box[4].classList.contains(currentPlayerFill) &&
        box[7].classList.contains(currentPlayerFill) ||
        box[2].classList.contains(currentPlayerFill) &&
        box[5].classList.contains(currentPlayerFill) &&
        box[8].classList.contains(currentPlayerFill) ||
        box[0].classList.contains(currentPlayerFill) &&
        box[4].classList.contains(currentPlayerFill) &&
        box[8].classList.contains(currentPlayerFill) ||
        box[2].classList.contains(currentPlayerFill) &&
        box[4].classList.contains(currentPlayerFill) &&
        box[6].classList.contains(currentPlayerFill) ) {
          gameWinner = currentPlayer;
          return gameWinner;
    }
  }

  function whoWon () {
    if (forTheWin("box-filled-1", "o") === "o") {
      showWinScreen("screen-win-one", player1.value);
    } else if (forTheWin("box-filled-2", "x") === "x") {
      showWinScreen("screen-win-two", player2.value);
    } else if (movesMade === 9) {
        showTieScreen();
    }
  }

  function multiPlayerMode (e) {
    if (currentPlayer === "o") {
      makeMove(e.target, "box-filled-1", "x");
    } else if (currentPlayer === "x") {
      makeMove(e.target, "box-filled-2", "o");
    }
    whoWon();
  }

  function singlePlayerMode (e) {
    if (currentPlayer === "o") {
      if(isBlockTaken(e.target) === true){
        // console.log("Square is already taken.");
      //else make the players move
    } else {
      e.target.classList.add("box-filled-1");
      currentPlayer = "x";
      movesMade++;
      highlightCurrentPlayer('player2', 'player1');
      gameBoard.removeEventListener("click", multiPlayerMode);
      if (movesMade < 8) {
        apiMove();
        currentPlayer = "o";
        highlightCurrentPlayer('player1', 'player2');
      }
    }
    }
    gameBoard.addEventListener("click", multiPlayerMode);
    whoWon();
  }

  function apiMove () {
    var randomNum;
    var apiBlockPick;
    do {
      randomNum = Math.floor(Math.random() * 9);
      apiBlockPick = box[randomNum];
      console.log(randomNum);
    } while (isBlockTaken(apiBlockPick));

    function moveToMake (e) {
      // makeMove(e.target, "box-filled-1", "x");
      e.target.classList.add("box-filled-2");
    }

    apiBlockPick.addEventListener("click", moveToMake);
    apiBlockPick.click();
    movesMade++;
    apiBlockPick.removeEventListener("click", moveToMake);
  }

  //When the current player mouses over an empty square on the board, it's symbol should appear on the square
  gameBoard.addEventListener("mouseover", function(e) {
    if (currentPlayer === "o" && isBlockTaken(e.target) === false) {
      e.target.style.backgroundImage = "url('img/o.svg')";
    } else if (currentPlayer === "x" && isBlockTaken(e.target) === false) {
      e.target.style.backgroundImage = "url('img/x.svg')";
    }
  });

  //mouseout takes the background image off
  gameBoard.addEventListener("mouseout", function(e) {
    e.target.style.backgroundImage = "";
  });

  $(document).ready(function () {
    showStartScreen();
    highlightCurrentPlayer('player1', 'player2');

    document.getElementById("singlePlayer").addEventListener("click", function () {
      $("#multiPlayer").hide();
      $("#singlePlayer").hide();
      startScreenHeader.appendChild(player1);
      startScreenHeader.appendChild(startScreenBtn);
    });

    document.getElementById("multiPlayer").addEventListener("click", function () {
      $("#multiPlayer").hide();
      $("#singlePlayer").hide();
      startScreenHeader.appendChild(player1);
      startScreenHeader.appendChild(player2);
      startScreenHeader.appendChild(startScreenBtn);
    });
  });
// })();
