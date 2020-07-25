'use strict';

(function () {
  var OFFER_TYPES_KEY = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var onSuccess = function (xhrResponse) {
    window.data.pins = xhrResponse;
  };

  var getPinsData = function () {
    window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, window.util.onError);
  };

  getPinsData();

  window.data = {
    OFFER_TYPES_KEY: OFFER_TYPES_KEY
  };
})();
