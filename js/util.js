'use strict';

(function () {
  var COORDINATES_Y_MIN = 130;
  var COORDINATES_Y_MAX = 630;

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

  window.util = {
    COORDINATES_Y_MIN: COORDINATES_Y_MIN,
    COORDINATES_Y_MAX: COORDINATES_Y_MAX,
    isPageEnabled: isPageEnabled,
    getRandomInteger: getRandomInteger,
    getRandomArr: getRandomArr
  };
})();
