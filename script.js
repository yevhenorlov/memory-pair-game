// const cards = document.querySelectorAll('.card');
// cards.forEach(card => {
//     card.addEventListener('click', function() {
//         this.classList.toggle('flipped');
//     });
// });

/////////

const cards = document.querySelectorAll(".card");
const pairsNum = 8; // values between 1-8, for more values images for cards must be set in style.css
const isInputEnabled = true;

const generateCardIds = function(pairsNum) {
  const IdsArray = [];
  for (var i = 0; i < pairsNum; i++) {
    IdsArray.push(i);
  }
  return IdsArray;
};

const shuffleCards = function(IdsArray) {
  console.log("shuffle cards");
  // implement shuffling
};

const flushAllCards = function(allCards) {
  allCards.forEach(card => {
    card.classList.remove("flipped solved");
  });
};

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
