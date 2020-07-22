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
    window.map.element.classList.remove('map--faded');
    window.util.isPageEnabled = true;
    window.form.init();
    window.map.renderPins(8);
    window.map.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.map.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.util.mainPinCoordinates = window.util.getMainPinCoordinates(window.util.isPageEnabled);
  };

  window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinEnterPress);
})();

