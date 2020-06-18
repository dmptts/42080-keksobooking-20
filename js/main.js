'use strict'

var USER_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8];
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
]

var objArr = [];

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getAndRemoveArrItem = function (arr) {
  var randomInt = getRandomInteger(0, arr.length - 1);
  var randomIndex = arr[randomInt];
  arr.splice(randomInt, 1);
  return randomIndex;
}

var getRandomArr = function (arr) {
  var arrCopy = arr.slice();
  var randomArr = [];
  var randomArrLength = getRandomInteger(1, arr.length);

  for (var i = 0; i < randomArrLength; i++) {
    randomArr.push(getAndRemoveArrItem(arrCopy));
  }

  return randomArr;
}

var getBodyWidthNum = function () {
  var pageBody = document.querySelector('body');
  var pageBodyWidth = getComputedStyle(pageBody).width;
  var pageBodyWidthNum = Number(pageBodyWidth.slice(0, -2));
  return pageBodyWidthNum;
}

var generateObjData = function () {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getAndRemoveArrItem(USER_INDEXES) + '.png'
    },

    'offer': {
      'title': OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)],
      'price': Number(getRandomInteger(5, 50) + '00000'),
      'type': OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
      'rooms': getRandomInteger(1, 3),
      'guests': getRandomInteger(1, 50),
      'checkin': OFFER_CHEKINS_CHECKOUTS[getRandomInteger(0, OFFER_CHEKINS_CHECKOUTS.length - 1)],
      'checkout': OFFER_CHEKINS_CHECKOUTS[getRandomInteger(0, OFFER_CHEKINS_CHECKOUTS.length - 1)],
      'features': getRandomArr(OFFER_FEATURES),
      'description': getAndRemoveArrItem(OFFER_DESCRIPTIONS),
      'photos': getRandomArr(OFFER_PHOTOS)
    },

    'location': {
      'x': getRandomInteger(0, getBodyWidthNum()),
      'y':getRandomInteger(130, 630)
    }
  }
}

var generateObjArr = function (objQuantity) {
  for (var i = 0; i < objQuantity; i++) {
    objArr[i] = generateObjData();
  }
}

generateObjArr(8);
