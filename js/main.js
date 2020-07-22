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
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.toggleFieldsets(false);
    window.map.renderPins(8);
    window.util.mapMainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.util.mapMainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.util.isPageEnabled = true;
    window.util.mainPinCoordinates = window.util.getMainPinCoordinates();
    window.form.setAddress(window.util.mainPinCoordinates.mainPinX, window.util.mainPinCoordinates.mainPinY);
    window.form.validateQuantity();
    window.form.getMinimalPrice();
  };

  window.util.mapMainPin.addEventListener('mousedown', onMainPinMousedown);
  window.util.mapMainPin.addEventListener('keydown', onMainPinEnterPress);

  window.form.toggleFieldsets(true);
})();

