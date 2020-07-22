'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_PEAK_HEIGTH = 22;

  var isPageEnabled = false;

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArr = function (arr) {
    var arrCopy = arr.slice();
    var randomArr = [];
    var randomArrLength = window.util.getRandomInteger(1, arr.length);

    for (var i = 0; i < randomArrLength; i++) {
      randomArr.push(window.data.getAndRemoveArrItem(arrCopy));
    }

    return randomArr;
  };

  var getMainPinCoordinates = function (pageState) {
    var mainPinX = pageState ? window.map.mainPin.offsetLeft - MAIN_PIN_HEIGTH - MAIN_PIN_PEAK_HEIGTH : window.map.mainPin.offsetLeft - MAIN_PIN_HEIGTH / 2;
    var mainPinY = window.map.mainPin.offsetTop - MAIN_PIN_WIDTH / 2;

    return {mainPinX: mainPinX, mainPinY: mainPinY};
  };

  window.util = {
    isPageEnabled: isPageEnabled,
    mainPinCoordinates: getMainPinCoordinates(isPageEnabled),
    getRandomInteger: getRandomInteger,
    getRandomArr: getRandomArr,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
