'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
  var mapMainPin = document.querySelector('.map__pin--main');
  var mapFilter = document.querySelector('.map__filters-container');
  var pinsBlock = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  var card;

  var renderPins = function (pinsQuantity) {
    window.data.generatePins(pinsQuantity);

    for (var i = 0; i < window.data.pins.length; i++) {
      pinFragment.appendChild(window.pin.create(window.data.pins[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  var renderCard = function (pinObj) {
    window.map.element.insertBefore(window.card.create(pinObj), mapFilter);
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
    element: map,
    width: mapWidth,
    mainPin: mapMainPin,
    renderPins: renderPins,
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
