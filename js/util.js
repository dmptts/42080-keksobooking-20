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

  var onError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    COORDINATES_Y_MIN: COORDINATES_Y_MIN,
    COORDINATES_Y_MAX: COORDINATES_Y_MAX,
    isPageEnabled: isPageEnabled,
    getRandomInteger: getRandomInteger,
    getRandomArr: getRandomArr,
    onError: onError
  };
})();
