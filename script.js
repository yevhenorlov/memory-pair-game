// const cards = document.querySelectorAll('.card');
// cards.forEach(card => {
//     card.addEventListener('click', function() {
//         this.classList.toggle('flipped');
//     });
// });

/////////

const cards = document.querySelectorAll(".card");
const groupsNum = 8; // values between 1-8, for more values images for cards must be set in style.css
const cardsInGroupNum = 2; // how many cards of the same type must be selected
const isInputEnabled = true;

const generateCardIds = function(groupsNum, cardsInGroupNum) {
  const IdsArray = [];
  for (var groupIndex = 0; groupIndex < groupsNum; groupIndex++) {
    for (var cardInGroupIndex = 0; cardInGroupIndex < cardsInGroupNum; cardInGroupIndex++) {
      IdsArray.push(groupIndex);
    }
  }
  return IdsArray;
};

console.log(generateCardIds(groupsNum, cardsInGroupNum));

const populateCards = function(ShuffledIdsArray) {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = "";
  const content = ShuffledIdsArray.map(val => {
    return `
      <div class="card card-${val}">
          <div class="card-inner">
              <div class="front"></div>
              <div class="back"></div>
          </div>
      </div>
    `
  }).join('');
  cardsContainer.innerHTML = content;
};

populateCards(generateCardIds(groupsNum, cardsInGroupNum));

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
