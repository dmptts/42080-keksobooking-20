'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;
  var MAX_SIMILAR_PINS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
  var mapMainPin = document.querySelector('.map__pin--main');
  var pinsBlock = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();

  var renderPins = function () {
    for (var i = 0; i < MAX_SIMILAR_PINS_COUNT; i++) {
      if (window.data.pins[i].offer) {
        pinFragment.appendChild(window.pin.create(window.data.pins[i]));
      }
    }

    pinsBlock.appendChild(pinFragment);
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    renderPins();
    window.form.setAddress(window.util.isPageEnabled);
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

      if (parseInt(mapMainPin.style.top, 10) - shift.y >= window.util.COORDINATES_Y_MIN - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH &&
      parseInt(mapMainPin.style.top, 10) - shift.y <= window.util.COORDINATES_Y_MAX - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH) {
        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      }

      if (parseInt(mapMainPin.style.left, 10) - shift.x >= 0 - MAIN_PIN_WIDTH / 2 && parseInt(mapMainPin.style.left, 10) - shift.x <= mapWidth - MAIN_PIN_WIDTH / 2) {
        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.setAddress(window.util.isPageEnabled);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.util.isPageEnabled);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGTH: MAIN_PIN_HEIGTH,
    MAIN_PIN_PEAK_HEIGTH: MAIN_PIN_PEAK_HEIGTH,
    element: map,
    width: mapWidth,
    mainPin: mapMainPin,
    init: initMap,

  };
})();
