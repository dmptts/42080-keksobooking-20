'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;

  var map = document.querySelector('.map');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
  var mapMainPin = document.querySelector('.map__pin--main');
  var pinsBlock = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();

  var getMainPinCoordinates = function (pageState) {
    var mainPinX = pageState ? mapMainPin.offsetLeft - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH : mapMainPin.offsetLeft - MAIN_PIN_HEIGTH / 2;
    var mainPinY = mapMainPin.offsetTop - MAIN_PIN_WIDTH / 2;

    return {mainPinX: mainPinX, mainPinY: mainPinY};
  };

  var renderPins = function (pinsQuantity) {
    window.data.generatePins(pinsQuantity);

    for (var i = 0; i < window.data.pins.length; i++) {
      pinFragment.appendChild(window.pin.create(window.data.pins[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    renderPins(8);
    window.map.mainPinCoordinates = getMainPinCoordinates(window.util.isPageEnabled);
  };

  window.map = {
    element: map,
    width: mapWidth,
    mainPin: mapMainPin,
    mainPinCoordinates: getMainPinCoordinates(window.util.isPageEnabled),
    init: initMap,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
