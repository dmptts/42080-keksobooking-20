'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var pinsBlock = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  var card;

  var renderPins = function (pinsQuantity) {
    window.data.generateArr(pinsQuantity);

    for (var i = 0; i < window.data.arr.length; i++) {
      pinFragment.appendChild(window.pin.create(window.data.arr[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  var renderCard = function (pinObj) {
    window.util.mapElement.insertBefore(window.card.create(pinObj), mapFilter);
    document.addEventListener('keydown', onPopupEcsPress);
    card = document.querySelector('.popup');
  };

  var removeCard = function () {
    if (card) {
      document.removeEventListener('keydown', onPopupEcsPress);
      card.remove();
    }
  };

  var onPopupEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeCard();
    }
  };

  window.map = {
    renderPins: renderPins,
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
