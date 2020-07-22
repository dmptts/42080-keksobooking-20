'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;

  var map = document.querySelector('.map');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
  var mapMainPin = document.querySelector('.map__pin--main');

  var getMainPinCoordinates = function (pageState) {
    var mainPinX = pageState ? mapMainPin.offsetLeft - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH : mapMainPin.offsetLeft - MAIN_PIN_HEIGTH / 2;
    var mainPinY = mapMainPin.offsetTop - MAIN_PIN_WIDTH / 2;

    return {mainPinX: mainPinX, mainPinY: mainPinY};
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    window.pin.render(8);
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
