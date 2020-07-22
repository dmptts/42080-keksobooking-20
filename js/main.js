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
    window.util.mapElement.classList.remove('map--faded');
    window.util.isPageEnabled = true;
    window.form.init();
    window.map.renderPins(8);
    window.util.mapMainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.util.mapMainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.util.mainPinCoordinates = window.util.getMainPinCoordinates(window.util.isPageEnabled);
  };

  window.util.mapMainPin.addEventListener('mousedown', onMainPinMousedown);
  window.util.mapMainPin.addEventListener('keydown', onMainPinEnterPress);
})();

