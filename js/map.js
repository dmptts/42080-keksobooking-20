'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;
  var COORDINATES_Y_MIN = 130;
  var COORDINATES_Y_MAX = 630;
  var MAX_SIMILAR_PINS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
  var mapMainPin = document.querySelector('.map__pin--main');
  var mapMainPinDefaultX = mapMainPin.style.left;
  var mapMainPinDefaultY = mapMainPin.style.top;
  var pinsBlock = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  var mapErrorBlock;

  var enablePage = function () {
    window.map.isPageEnabled = true;
    mapMainPin.removeEventListener('mousedown', onMainPinMousedown);
    mapMainPin.removeEventListener('keydown', onMainPinEnterPress);
    initMap();
    window.form.init();
    window.network.load(window.map.onSuccess, window.map.onError);
  };

  var disablePage = function () {
    window.map.isPageEnabled = false;
    mapMainPin.addEventListener('mousedown', onMainPinMousedown);
    mapMainPin.addEventListener('keydown', onMainPinEnterPress);
    disableMap();
    window.form.disable();
    window.filter.disable();
  };

  var renderPins = function (pins) {
    for (var i = 0; i < MAX_SIMILAR_PINS_COUNT && i < pins.length; i++) {
      if (pins[i].offer) {
        pinFragment.appendChild(window.pin.create(pins[i]));
      }
    }

    pinsBlock.appendChild(pinFragment);
  };

  var disableMap = function () {
    map.classList.add('map--faded');
    removePins();
    window.card.remove();
    setDefaultMainPinCoords();
  };

  var removePins = function () {
    var pins = pinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var setDefaultMainPinCoords = function () {
    mapMainPin.style.left = mapMainPinDefaultX;
    mapMainPin.style.top = mapMainPinDefaultY;
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    window.form.setAddress(window.map.isPageEnabled);
  };

  var onSuccess = function (responseData) {
    window.map.pinsData = responseData;
    renderPins(window.map.pinsData);
    window.filter.init();

    if (mapErrorBlock) {
      mapErrorBlock.remove();
    }
  };

  var onError = function (message) {
    if (!mapErrorBlock) {
      mapErrorBlock = document.createElement('div');
      mapErrorBlock.classList.add('map__error');

      mapErrorBlock.textContent = message;
      document.body.insertAdjacentElement('afterbegin', mapErrorBlock);
    }
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      enablePage();
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      enablePage();
    }
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

      if (parseInt(mapMainPin.style.top, 10) - shift.y >= COORDINATES_Y_MIN - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH &&
      parseInt(mapMainPin.style.top, 10) - shift.y <= COORDINATES_Y_MAX - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH) {
        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      }

      if (parseInt(mapMainPin.style.left, 10) - shift.x >= 0 - MAIN_PIN_WIDTH / 2 && parseInt(mapMainPin.style.left, 10) - shift.x <= mapWidth - MAIN_PIN_WIDTH / 2) {
        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.setAddress(window.map.isPageEnabled);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.map.isPageEnabled);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapMainPin.addEventListener('mousedown', onMainPinMousedown);
  mapMainPin.addEventListener('keydown', onMainPinEnterPress);

  window.map = {
    isPageEnabled: false,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGTH: MAIN_PIN_HEIGTH,
    MAIN_PIN_PEAK_HEIGTH: MAIN_PIN_PEAK_HEIGTH,
    element: map,
    mainPin: mapMainPin,
    pinsData: [],
    renderPins: renderPins,
    removePins: removePins,
    disablePage: disablePage,
    disableMap: disableMap,
    onSuccess: onSuccess,
    onError: onError
  };
})();
