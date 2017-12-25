const game = {
  groupsNum: 2, // values between 1-8, for more values images for cards must be set in style.css
  cardsInGroupNum: 3, // how many cards of the same type must be selected
  isInputEnabled: true,
  isMatched: null,
  cards: null,
  comparisonArray: [], // card values are pushed here to be compared later

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
        if (!game.isMatched) {
          game.comparisonArray.forEach(element => {
            let card = document.querySelectorAll(`.${element}`);
            card.forEach(element => element.classList.remove("flipped"));
          });

          game.comparisonArray = [];
          game.isInputEnabled = true;
        } else if (game.isMatched) {
          game.comparisonArray.forEach(element => {
            let card = document.querySelectorAll(`.${element}`);
            card.forEach(element => element.classList.add("solved"));
          });

          game.comparisonArray = [];
          game.isInputEnabled = true;
        }
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

  init: function() {
    let idsArray = game.generateCardIds(game.groupsNum, game.cardsInGroupNum);
    let shuffledIdsArray = game.shuffle(idsArray);
    game.populateCards(shuffledIdsArray);
    game.initInterface();
  }
};

game.init();

// 00 start game, shuffle cards, flush all cards

// 10 on card click, set it to active state, store its id in values array.
// if values array length > limit, block further input, go to 20.

// 20 compare ids,
//     if different, flush their states, enable input, goto 10.
//     if same, set both to solved, goto 30.

// 30 count cards,
//     if there are cards unsolved, enable input, goto 10.
//     if no cards unsolved, goto 40.

// 40 game is won, prompt,
// if restart game, goto 00
