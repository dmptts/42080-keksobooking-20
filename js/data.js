'use strict';

(function () {
  var OFFER_TITLES = [
    '2-комн. кв., 57,45 м², 20/24 этаж',
    '2-комн. кв., 76,85 м², 3/9 этаж',
    '1-комн. кв., 32 м², 5/9 этаж',
    '1-комн. кв., 44,5 м², 8/14 этаж',
    'Готовая 2Е в ДИЗАЙНЕРСКОМ ЖК',
    'Евро 3шка. Дом у парка и метро!',
    '2-комн. кв., 83,3 м², 11/11 этаж',
    '1-комн. апарт., 37,9 м², 8/18 этаж'
  ];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHEKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = [
    'Продается 1-комнатная квартира, в строящемся доме (Promenade, корпус 6), срок сдачи: IV-кв. 2021, общей площадью 40.33 кв.м., на 7 этаже.',
    'Продается 1-комнатная квартира, в строящемся доме (корпус 3), срок сдачи: III-кв. 2021, общей площадью 39.80 кв.м., на 2 этаже.  UP-квартал расположен на юге Санкт-Петербурга всего в 2 км от ст. м. Купчино, с прекрасным сообщением с общественным транспортом.',
    'Продается 1-комнатная квартира, в строящемся доме (Корпус 6), срок сдачи: IV-кв. 2020, общей площадью 40.95 кв.м., на 2 этаже. Шесть трёхэтажных домов комфорт-класса с уникальной архитектурой, возле живописного пруда.',
    'Продается 1-комнатная квартира, в строящемся доме (Дом 23А), срок сдачи: IV-кв. 2020, общей площадью 40.78 кв.м., на 5 этаже. Жилой комплекс будет располагаться в Калининском районе.',
    'Продается 2-комнатная квартира, в строящемся доме (корпус 44.4), срок сдачи: IV-кв. 2021, общей площадью 65.64 кв.м., на 1 этаже.',
    'Продается 2-комнатная квартира, в строящемся доме, срок сдачи: II-кв. 2021, общей площадью 61.20 кв.м., на 3 этаже. "Цивилизация на Неве" - это видовые дома бизнес-класса, расположенные в лучшей части масштабного проекта "Цивилизация".',
    '"LEGENDA Комендантского" - это первая часть большого суперсовременного smart-комплекса, который замкнет границы целого квартала на Комендантском проспекте. Идея проекта в том, чтобы создать абсолютно самодостаточную комфортную среду, где будет все, что нужно требовательным покупателям smart-квартир. Здесь, без пересечения с проезжей частью, будут магазины и офисы, собственная зеленая территория и спортивный комплекс, школа и детский сад.',
    'Новый жилой smart-комплекс компании LEGENDA Intelligent Development расположен в южно-приморской части Санкт-Петербурга на самом въезде в новый престижный микрорайон в непосредственной близости от Финского залива. В проекте 4 корпуса и 21 жилой этаж. Архитектурная концепция предполагает, что проект станет настоящим украшением этой территории. Комплекс выделяют стильный дизайн, комфортные семейные планировки, панорамные виды, бестселлеры предыдущих проектов LEGENDA и уникальная концепция благоустройства двора.'
  ];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var OFFER_TYPES_KEY = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var COORDINATES_X_MIN = 130;
  var COORDINATES_X_MAX = 630;

  var pinsDataArr = [];

  var generateObjData = function (index) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },

      'offer': {
        'title': OFFER_TITLES[window.util.getRandomInteger(0, OFFER_TITLES.length - 1)],
        'price': window.util.getRandomInteger(5000, 50000),
        'type': OFFER_TYPES[window.util.getRandomInteger(0, OFFER_TYPES.length - 1)],
        'rooms': window.util.getRandomInteger(1, 3),
        'guests': window.util.getRandomInteger(1, 50),
        'checkin': OFFER_CHEKINS_CHECKOUTS[window.util.getRandomInteger(0, OFFER_CHEKINS_CHECKOUTS.length - 1)],
        'checkout': OFFER_CHEKINS_CHECKOUTS[window.util.getRandomInteger(0, OFFER_CHEKINS_CHECKOUTS.length - 1)],
        'features': window.util.getRandomArr(OFFER_FEATURES),
        'description': window.util.getAndRemoveArrItem(OFFER_DESCRIPTIONS),
        'photos': window.util.getRandomArr(OFFER_PHOTOS)
      },

      'location': {
        'x': window.util.getRandomInteger(25, window.util.mapWidth - 25),
        'y': window.util.getRandomInteger(COORDINATES_X_MIN, COORDINATES_X_MAX)
      }
    };
  };

  var generatePinsDataArr = function (objQuantity) {
    for (var i = 0; i < objQuantity; i++) {
      window.data.arr[i] = generateObjData(i);
    }
  };

  window.data = {
    OFFER_TYPES_KEY: OFFER_TYPES_KEY,
    arr: pinsDataArr,
    generateArr: generatePinsDataArr
  };
})();
