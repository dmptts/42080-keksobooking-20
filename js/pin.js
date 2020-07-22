'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var pinTemplate = document.querySelector('#pin').content;

  var createPin = function (pinObj) {
    var pinElement = pinTemplate.cloneNode(true);
    var pin = pinElement.querySelector('.map__pin');
    var pinImg = pinElement.querySelector('.map__pin img');

    pin.style.top = pinObj.location.y - PIN_HEIGTH + 'px';
    pin.style.left = pinObj.location.x - (PIN_WIDTH / 2) + 'px';
    pinImg.src = pinObj.author.avatar;
    pinImg.alt = pinObj.offer.title;

    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.remove();
      window.card.render(pinObj);
    });

    return pinElement;
  };

  window.pin.create = createPin;
})();
