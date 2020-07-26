'use strict';

(function () {
  var isPageEnabled = false;

  var onError = function (message) {
    if (!document.querySelector('.map__error')) {
      var node = document.createElement('div');
      node.classList.add('map__error');

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.network.load(enablePage, window.main.onError);
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.network.load(enablePage, window.main.onError);
    }
  };

  var enablePage = function (pinsData) {
    isPageEnabled = true;
    window.map.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.map.init(pinsData);
    window.form.init();
    if (document.querySelector('.map__error')) {
      document.querySelector('.map__error').remove();
    }
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

