'use strict';

(function () {
  var isPageEnabled = false;

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

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.load(enablePage, window.main.onError);
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.load(enablePage, window.main.onError);
    }
  };

  var enablePage = function (pinsData) {
    isPageEnabled = true;
    window.map.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.map.init(pinsData);
    window.form.init();
  };

  var disablePage = function () {
    isPageEnabled = false;
    window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.addEventListener('keydown', onMainPinEnterPress);
    window.map.disable();
    window.form.disable();
  };

  window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.main = {
    isPageEnabled: isPageEnabled,
    onError: onError,
    disablePage: disablePage
  };
})();

