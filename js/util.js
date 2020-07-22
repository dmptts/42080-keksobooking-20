'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;

  var isPageEnabled = false;
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');
  var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArr = function (arr) {
    var arrCopy = arr.slice();
    var randomArr = [];
    var randomArrLength = window.util.getRandomInteger(1, arr.length);

    for (var i = 0; i < randomArrLength; i++) {
      randomArr.push(window.util.getAndRemoveArrItem(arrCopy));
    }

    return randomArr;
  };

  var getAndRemoveArrItem = function (arr) {
    var randomInt = window.util.getRandomInteger(0, arr.length - 1);
    var randomIndex = arr[randomInt];
    arr.splice(randomInt, 1);
    return randomIndex;
  };

  var getMainPinCoordinates = function (pageState) {
    var mainPinX = pageState ? mapMainPin.offsetLeft - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH : mapMainPin.offsetLeft - MAIN_PIN_HEIGTH / 2;
    var mainPinY = mapMainPin.offsetTop - MAIN_PIN_WIDTH / 2;

    return {mainPinX: mainPinX, mainPinY: mainPinY};
  };

  window.util = {
    isPageEnabled: isPageEnabled,
    mapElement: map,
    mapMainPin: mapMainPin,
    mapWidth: mapWidth,
    mainPinCoordinates: getMainPinCoordinates(isPageEnabled),
    getRandomInteger: getRandomInteger,
    getRandomArr: getRandomArr,
    getAndRemoveArrItem: getAndRemoveArrItem,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
