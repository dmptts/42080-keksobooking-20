'use strict';

(function () {
  var isPageEnabled = false;
  var mapErrorBlock;

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
    if (mapErrorBlock) {
      mapErrorBlock.remove();
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

