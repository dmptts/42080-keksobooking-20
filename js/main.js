'use strict';

(function () {
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

  var enablePage = function () {
    window.main.isPageEnabled = true;
    window.map.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.map.init();
    window.form.init();
    window.network.load(window.map.onSuccess, window.map.onError);
  };

  var disablePage = function () {
    window.main.isPageEnabled = false;
    window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.addEventListener('keydown', onMainPinEnterPress);
    window.map.disable();
    window.form.disable();
    window.filter.disable();
  };

  window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.main = {
    isPageEnabled: false,
    disablePage: disablePage
  };
})();

