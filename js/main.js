'use strict';

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
// var OFFER_TYPES_KEY = {
//   'palace': 'Дворец',
//   'flat': 'Квартира',
//   'house': 'Дом',
//   'bungalo': 'Бунгало'
// };
var COORDINATES_X_MIN = 130;
var COORDINATES_X_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;

var pinsDataArr = [];
var pinTemplate = document.querySelector('#pin').content;
// var popupTemplate = document.querySelector('#card').content;
var map = document.querySelector('.map');
var mapMainPin = document.querySelector('.map__pin--main');
// var mapFilter = document.querySelector('.map__filters-container');
var mapWidth = Number(getComputedStyle(map).width.slice(0, -2));
var pinsBlock = document.querySelector('.map__pins');
var pinFragment = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

var onMainPinMousedown = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    enablePage();
  }
};

var disableFieldsets = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', true);
  }
};

var enableFieldsets = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }
};

var enablePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableFieldsets();
  renderPins(8);
  mapMainPin.removeEventListener('mousedown', onMainPinMousedown);
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getAndRemoveArrItem = function (arr) {
  var randomInt = getRandomInteger(0, arr.length - 1);
  var randomIndex = arr[randomInt];
  arr.splice(randomInt, 1);
  return randomIndex;
};

var getRandomArr = function (arr) {
  var arrCopy = arr.slice();
  var randomArr = [];
  var randomArrLength = getRandomInteger(1, arr.length);

  for (var i = 0; i < randomArrLength; i++) {
    randomArr.push(getAndRemoveArrItem(arrCopy));
  }

  return randomArr;
};

var generateObjData = function (index) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },

    'offer': {
      'title': OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)],
      'price': getRandomInteger(5000, 50000),
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
      'x': getRandomInteger(25, mapWidth - 25),
      'y': getRandomInteger(COORDINATES_X_MIN, COORDINATES_X_MAX)
    }
  };
};

var generatePinsDataArr = function (objQuantity) {
  for (var i = 0; i < objQuantity; i++) {
    pinsDataArr[i] = generateObjData(i);
  }
};

var createPin = function (pinObj) {
  var pinElement = pinTemplate.cloneNode(true);
  var pin = pinElement.querySelector('.map__pin');
  var pinImg = pinElement.querySelector('.map__pin img');

  pin.style.top = pinObj.location.y - PIN_HEIGTH + 'px';
  pin.style.left = pinObj.location.x - (PIN_WIDTH / 2) + 'px';
  pinImg.src = pinObj.author.avatar;
  pinImg.alt = pinObj.offer.title;

  return pinElement;
};

var renderPins = function (pinsQuantity) {
  generatePinsDataArr(pinsQuantity);

  for (var i = 0; i < pinsDataArr.length; i++) {
    pinFragment.appendChild(createPin(pinsDataArr[i]));
  }

  pinsBlock.appendChild(pinFragment);
};

// var filterFeatures = function (popupElement, flatObj) {
//   var popupFeaturesList = popupElement.querySelectorAll('.popup__features');
//   var popupFeatureItems = popupElement.querySelectorAll('.popup__feature');

//   for (var i = 0; i < popupFeatureItems.length; i++) {
//     if (!checkFeatureAvailabililty(popupFeatureItems, flatObj, i)) {
//       popupFeaturesList[0].removeChild(popupFeatureItems[i]);
//     }
//   }
// };

// var checkFeatureAvailabililty = function (popupFeatureItems, flatObj, index) {
//   for (var j = 0; j < flatObj.offer.features.length; j++) {
//     if (popupFeatureItems[index].classList.contains('popup__feature--' + flatObj.offer.features[j])) {
//       return true;
//     }
//   }

//   return false;
// };

// var addPhotos = function (popupElement) {
//   var popupPhotosContainer = popupElement.querySelector('.popup__photos');
//   var popupPhotoTemplate = popupElement.querySelector('.popup__photo');
//   var popupPhotosFragment = document.createDocumentFragment();

//   for (var i = 0; i < pinsDataArr[0].offer.photos.length; i++) {
//     var popupPhoto = popupPhotoTemplate.cloneNode(true);
//     popupPhoto.src = pinsDataArr[0].offer.photos[i];
//     popupPhotosFragment.appendChild(popupPhoto);
//   }

//   popupPhotosContainer.replaceChild(popupPhotosFragment, popupPhotoTemplate);
// };

// var createCard = function (flatObj) {
//   var popupElement = popupTemplate.cloneNode(true);

//   popupElement.querySelector('.popup__title').textContent = flatObj.offer.title;
//   popupElement.querySelector('.popup__text--address').textContent = flatObj.offer.address;
//   popupElement.querySelector('.popup__text--price').textContent = flatObj
//   .offer.price + '₽/ночь';
//   popupElement.querySelector('.popup__type').textContent = OFFER_TYPES_KEY[flatObj.offer.type];
//   popupElement.querySelector('.popup__text--capacity').textContent = flatObj.offer.rooms + ' комнаты для ' + flatObj.offer.guests + ' гостей';
//   popupElement.querySelector('.popup__text--time').textContent = 'заезд после ' + flatObj.offer.checkin + ', выезд до ' + flatObj.offer.checkout;
//   popupElement.querySelector('.popup__description').textContent = flatObj.offer.description;

//   filterFeatures(popupElement, flatObj);
//   addPhotos(popupElement);

//   return popupElement;
// };

// var renderCard = function () {
//   map.insertBefore(createCard(pinsDataArr[0]), mapFilter);
// };

mapMainPin.addEventListener('mousedown', onMainPinMousedown);

disableFieldsets();
// renderCard();
