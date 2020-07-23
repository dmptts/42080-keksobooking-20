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
    var mainPinX = mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var mainPinY = pageState ? mapMainPin.offsetTop - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH : mapMainPin.offsetTop - MAIN_PIN_HEIGTH / 2;

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

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (parseInt(mapMainPin.style.top, 10) - shift.y >= window.util.COORDINATES_Y_MIN &&
      parseInt(mapMainPin.style.top, 10) - shift.y <= window.util.COORDINATES_Y_MAX) {
        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      }

      if (parseInt(mapMainPin.style.left, 10) - shift.x >= 0 - MAIN_PIN_WIDTH / 2 && parseInt(mapMainPin.style.left, 10) - shift.x <= mapWidth - MAIN_PIN_WIDTH / 2) {
        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.mainPinCoordinates = getMainPinCoordinates(window.util.isPageEnabled);
      window.form.setAddress(window.map.mainPinCoordinates.mainPinX, window.map.mainPinCoordinates.mainPinY);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    element: map,
    width: mapWidth,
    mainPin: mapMainPin,
    mainPinCoordinates: getMainPinCoordinates(window.util.isPageEnabled),
    init: initMap,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
