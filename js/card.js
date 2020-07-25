'use strict';

(function () {
  var OFFER_TYPES_KEY = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var popupTemplate = document.querySelector('#card').content;
  var mapFilter = document.querySelector('.map__filters-container');
  var card;

  var filterFeatures = function (popupElement, flatObj) {
    var popupFeaturesList = popupElement.querySelectorAll('.popup__features');
    var popupFeatureItems = popupElement.querySelectorAll('.popup__feature');

    for (var i = 0; i < popupFeatureItems.length; i++) {
      if (!checkFeatureAvailabililty(popupFeatureItems, flatObj, i)) {
        popupFeaturesList[0].removeChild(popupFeatureItems[i]);
      }
    }
  };

  var checkFeatureAvailabililty = function (popupFeatureItems, flatObj, index) {
    for (var j = 0; j < flatObj.offer.features.length; j++) {
      if (popupFeatureItems[index].classList.contains('popup__feature--' + flatObj.offer.features[j])) {
        return true;
      }
    }

    return false;
  };

  var addPhotos = function (popupElement, flatObj) {
    var popupPhotosContainer = popupElement.querySelector('.popup__photos');
    var popupPhotoTemplate = popupElement.querySelector('.popup__photo');
    var popupPhotosFragment = document.createDocumentFragment();

    for (var i = 0; i < flatObj.offer.photos.length; i++) {
      var popupPhoto = popupPhotoTemplate.cloneNode(true);
      popupPhoto.src = flatObj.offer.photos[i];
      popupPhotosFragment.appendChild(popupPhoto);
    }

    popupPhotosContainer.replaceChild(popupPhotosFragment, popupPhotoTemplate);
  };

  var createCard = function (flatObj) {
    var popupElement = popupTemplate.cloneNode(true);

    popupElement.querySelector('.popup__avatar').src = flatObj.author.avatar;
    popupElement.querySelector('.popup__title').textContent = flatObj.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = flatObj.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = flatObj
    .offer.price + '₽/ночь';
    popupElement.querySelector('.popup__type').textContent = OFFER_TYPES_KEY[flatObj.offer.type];
    popupElement.querySelector('.popup__text--capacity').textContent = flatObj.offer.rooms + ' комнаты для ' + flatObj.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'заезд после ' + flatObj.offer.checkin + ', выезд до ' + flatObj.offer.checkout;
    popupElement.querySelector('.popup__description').textContent = flatObj.offer.description;

    popupElement.querySelector('.popup__close').addEventListener('click', function (evt) {
      evt.preventDefault();
      removeCard();
    });

    filterFeatures(popupElement, flatObj);
    addPhotos(popupElement, flatObj);

    return popupElement;
  };

  var renderCard = function (pinObj) {
    window.map.element.insertBefore(createCard(pinObj), mapFilter);
    document.addEventListener('keydown', onPopupEcsPress);
    card = document.querySelector('.popup');
  };

  var removeCard = function () {
    if (card) {
      document.removeEventListener('keydown', onPopupEcsPress);
      card.remove();
    }
  };

  var onPopupEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeCard();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
