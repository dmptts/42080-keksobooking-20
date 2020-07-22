'use strict';

(function () {
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
    isPageEnabled: isPageEnabled,
    getRandomInteger: getRandomInteger,
    getRandomArr: getRandomArr
  };
})();
