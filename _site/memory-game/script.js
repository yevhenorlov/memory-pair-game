"use strict";

const game = {
  groupsNum: 8, // values between 2-8, for more values images for cards must be set in style.css
  cardsInGroupNum: 2, // how many cards of the same type must be selected (2-4 by default)
  isInputEnabled: true,
  isMatched: null,
  cards: null,
  promptModal: document.querySelector(".prompt-modal"),
  overlay: document.querySelector(".overlay"),
  comparisonArray: [], // card values are pushed here to be compared later
  cardsTotal: this.groupsNum * this.cardsInGroupNum,
  solvedNum: 0, // check against cardsTotal for win condition

  generateCardIds: function(groupsNum, cardsInGroupNum) {
    const idsArray = [];
    for (var groupIndex = 0; groupIndex < groupsNum; groupIndex++) {
      for (
        var cardInGroupIndex = 0;
        cardInGroupIndex < cardsInGroupNum;
        cardInGroupIndex++
      ) {
        idsArray.push(groupIndex);
      }
    }
    return idsArray;
  },

  shuffle: function(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  },

  populateCards: function(ShuffledIdsArray) {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";
    const content = ShuffledIdsArray.map(val => {
      return `
        <div class="card card-${val}">
            <div class="card-inner">
                <div class="front"></div>
                <div class="back"></div>
            </div>
        </div>
      `;
    }).join("");
    cardsContainer.innerHTML = content;
  },

  initInterface: function() {
    game.cards = document.querySelectorAll(".card");

    game.cards.forEach(card => {
      card.addEventListener("click", function() {
        if (
          this.classList.contains("flipped") ||
          this.classList.contains("solved")
        )
          return;
        if (game.isInputEnabled) {
          game.handleClicks(this);
        }
      });
    });
  },

  handleClicks: function($this) {
    let id = $this.classList[1]; // second class in the class list is 'card-n'
    game.comparisonArray.push(id);
    $this.classList.toggle("flipped");

    if (game.comparisonArray.length >= game.cardsInGroupNum) {
      game.isInputEnabled = false;
      game.isMatched = game.checkMatch();

      setTimeout(function() {
        game.comparisonArray.forEach(element => {
          let card = document.querySelectorAll(`.${element}`);
          if (!game.isMatched) {
            card.forEach(element => element.classList.remove("flipped"));
          } else if (game.isMatched) {
            card.forEach(element => element.classList.add("solved"));
          } else {
            console.log(
              "Fatal error (game.isMatched must resolve to a boolean value)"
            );
            return;
          }

          game.comparisonArray = [];
          game.isInputEnabled = true;
        });

        game.solvedNum = document.querySelectorAll('.solved').length;
        if(game.solvedNum >= game.cardsTotal) game.restartPrompt();
      }, 800);
    }

  },

  checkMatch: function() {
    for (let index = 1; index < game.comparisonArray.length; index++) {
      if (game.comparisonArray[index] !== game.comparisonArray[index - 1]) {
        return false;
      }
    }
    return true;
  },

  flushAllCards: function(allCards) {
    allCards.forEach(card => {
      card.classList.remove("flipped solved");
    });
  },

  hidePrompt: function() {
    game.promptModal.classList.add("hidden");
    game.overlay.classList.add("hidden");
  },

  startGame: function() {
    let groupsNumVal = document.getElementById("groupsNum").value;
    let cardsNumVal = document.getElementById("cardsInGroupNum").value;

    if (groupsNumVal >= 2 && groupsNumVal <= 8) {
      game.groupsNum = groupsNumVal;
    }
    if (cardsNumVal >= 2 && cardsNumVal <= 4) {
      game.cardsInGroupNum = cardsNumVal;
    }

    game.cardsTotal = game.groupsNum * game.cardsInGroupNum;

    game.init();
  },

  restartPrompt: function() {
    const newContent = `
    <p>Well done! Wanna try again?</p>
    <button type="button" onclick="game.restartGame()">Sure!</button>
    `;

    game.promptModal.innerHTML = newContent;
    game.promptModal.classList.remove('hidden');
    game.overlay.classList.remove('hidden');
  },

  restartGame: function() {
    location.reload(); // cheap and dirty solution for now
  },

  init: function() {
    let idsArray = game.generateCardIds(game.groupsNum, game.cardsInGroupNum);
    let shuffledIdsArray = game.shuffle(idsArray);
    game.populateCards(shuffledIdsArray);
    game.initInterface();
    game.hidePrompt();
  }
};