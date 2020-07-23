'use strict';

(function () {
  var ROOMS_MAX_QUANTITY = 100;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var roomQuiantityInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var validateQuantity = function () {
    if ((Number(roomQuiantityInput.value) !== ROOMS_MAX_QUANTITY) && (Number(capacityInput.value) > Number(roomQuiantityInput.value))) {
      capacityInput.setCustomValidity('Гостей не должно быть больше, чем комнат');
    } else if ((Number(roomQuiantityInput.value) === ROOMS_MAX_QUANTITY) && (Number(capacityInput.value) !== 0)) {
      capacityInput.setCustomValidity('Выбранное жилье не для гостей');
    } else if ((Number(roomQuiantityInput.value) !== ROOMS_MAX_QUANTITY) && (Number(capacityInput.value) === 0)) {
      capacityInput.setCustomValidity('Выберите вариант в 100 комнат');
    } else {
      capacityInput.setCustomValidity('');
    }
  };

  var getMinimalPrice = function () {
    if (typeInput.value === 'bungalo') {
      priceInput.min = 0;
    } else if (typeInput.value === 'flat') {
      priceInput.min = 1000;
    } else if (typeInput.value === 'house') {
      priceInput.min = 5000;
    } else {
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
    }
  };

  var synchronizeTimes = function (changedInput, synchronizedInput) {
    synchronizedInput.value = changedInput.value;
  };

  var setAddress = function (pageState) {
    var mainPinX = window.map.mainPin.offsetLeft + window.map.MAIN_PIN_WIDTH / 2;
    var mainPinY = pageState ? window.map.mainPin.offsetTop - window.map.MAIN_PIN_HEIGTH - window.map.MAIN_PIN_PEAK_HEIGTH : window.map.mainPin.offsetTop - window.map.MAIN_PIN_HEIGTH / 2;
    addressInput.value = mainPinX + ', ' + mainPinY;
  };

  var toggleFieldsets = function (isDisabled) {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = isDisabled;
    }
  };

  var initForm = function () {
    adForm.classList.remove('ad-form--disabled');
    toggleFieldsets(false);
    setAddress(window.util.isPageEnabled);
    validateQuantity();
    getMinimalPrice();
  };

  capacityInput.addEventListener('change', validateQuantity);
  typeInput.addEventListener('change', getMinimalPrice);
  timeInSelect.addEventListener('change', function () {
    synchronizeTimes(timeInSelect, timeOutSelect);
  });
  timeOutSelect.addEventListener('change', function () {
    synchronizeTimes(timeOutSelect, timeInSelect);
  });

  toggleFieldsets(false);
  setAddress(window.util.isPageEnabled);

  window.form = {
    elem: adForm,
    init: initForm,
    setAddress: setAddress
  };
})();
