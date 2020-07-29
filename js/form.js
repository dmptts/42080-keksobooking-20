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
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var successMessageTemplate = document.querySelector('#success').content;
  var errorMessageTemplate = document.querySelector('#error').content;

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
      priceInput.placeholder = 0;
    } else if (typeInput.value === 'flat') {
      priceInput.min = 1000;
      priceInput.placeholder = 1000;
    } else if (typeInput.value === 'house') {
      priceInput.min = 5000;
      priceInput.placeholder = 5000;
    } else {
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
    }
  };

  var syncTimes = function (changedInput, synchronizedInput) {
    synchronizedInput.value = changedInput.value;
  };

<<<<<<< HEAD
  var onTimeInSelectChange = function (evt) {
    evt.preventDefault();
    syncTimes(timeInSelect, timeOutSelect);
  };

  var onTimeOutSelectChange = function (evt) {
    evt.preventDefault();
=======
  var onTimeInSelectChange = function () {
    syncTimes(timeInSelect, timeOutSelect);
  };

  var onTimeOutSelectChange = function () {
>>>>>>> 706d58e
    syncTimes(timeOutSelect, timeInSelect);
  };

  var setAddress = function () {
    var mainPinX = window.map.mainPin.offsetLeft + window.map.MAIN_PIN_WIDTH / 2;
    var mainPinY = window.map.isPageEnabled ? window.map.mainPin.offsetTop + window.map.MAIN_PIN_HEIGTH + window.map.MAIN_PIN_PEAK_HEIGTH : window.map.mainPin.offsetTop - window.map.MAIN_PIN_HEIGTH / 2;
    addressInput.value = mainPinX + ', ' + mainPinY;
  };

  var toggleInputs = function (inputCollection, isDisabled) {
    for (var i = 0; i < inputCollection.length; i++) {
      inputCollection[i].disabled = isDisabled;
    }
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.network.upload(new FormData(adForm), onSuccess, onError);
  };

  var onAdFormResetButtonCLick = function (evt) {
    evt.preventDefault();
    window.map.disablePage();
  };

  var initForm = function () {
    adForm.classList.remove('ad-form--disabled');
    toggleInputs(adFormFieldsets, false);
    setAddress();
    validateQuantity();
    getMinimalPrice();
    capacityInput.addEventListener('change', validateQuantity);
    typeInput.addEventListener('change', getMinimalPrice);
    timeInSelect.addEventListener('change', onTimeInSelectChange);
    timeOutSelect.addEventListener('change', onTimeOutSelectChange);
    adForm.addEventListener('submit', onAdFormSubmit);
    adFormResetButton.addEventListener('click', onAdFormResetButtonCLick);
  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    setAddress();
    toggleInputs(adFormFieldsets, true);
    capacityInput.removeEventListener('change', validateQuantity);
    typeInput.removeEventListener('change', getMinimalPrice);
    timeInSelect.removeEventListener('change', onTimeInSelectChange);
    timeOutSelect.removeEventListener('change', onTimeOutSelectChange);
    adForm.removeEventListener('submit', onAdFormSubmit);
    adFormResetButton.removeEventListener('click', onAdFormResetButtonCLick);
  };

  var removeResultMessage = function (evt) {
    evt.preventDefault();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.querySelector('.result-message').remove();
  };

  var onDocumentClick = function (evt) {
    removeResultMessage(evt);
  };

  var onDocumentEscPress = function (evt) {
    if (evt.key === 'Escape') {
      removeResultMessage(evt);
    }
  };

  var onErrorMessageButtonClick = function (evt) {
    removeResultMessage(evt);
  };

  var onSuccess = function () {
    window.map.disablePage();
    var successMessageElement = successMessageTemplate.cloneNode(true);

    document.querySelector('body').appendChild(successMessageElement);
    document.querySelector('.success').classList.add('result-message');

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);
  };

  var onError = function () {
    var errorMessageElement = errorMessageTemplate.cloneNode(true);

    document.querySelector('main').appendChild(errorMessageElement);

    document.querySelector('.error').classList.add('result-message');

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);
    document.querySelector('.error__button').addEventListener('click', onErrorMessageButtonClick);
  };

  toggleInputs(adFormFieldsets, true);
  setAddress();

  window.form = {
    init: initForm,
    disable: disableForm,
    toggleInputs: toggleInputs,
    setAddress: setAddress
  };
})();
