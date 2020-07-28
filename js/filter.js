'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterInputs = filters.querySelectorAll('.map__filter, .map__features');
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');

  var initFilters = function () {
    filters.classList.remove('map__filters--hidden');
    window.form.toggleInputs(filterInputs, false);
    filters.addEventListener('change', onFiltersChange);
  };

  var disableFilters = function () {
    filters.classList.add('map__filters--hidden');
    window.form.toggleInputs(filterInputs, true);
    filters.reset();
  };

  var getFilteredFlats = function (data) {
    var filteredPins = [];
    for (var i = 0; i < data.length; i++) {
      if (filteredPins.length < window.map.MAX_PINS_COUNT) {
        if (checkFlat(data[i])) {
          filteredPins.push(data[i]);
        }
      } else {
        break;
      }
    }
    return filteredPins;
  };

  var checkFlat = function (flat) {
    return (filterByType(flat) && filterByPrice(flat) && filterByRooms(flat)) && filterByGuests(flat) && filterByFeatures(flat);
  };

  var filterByType = function (flat) {
    return flat.offer.type === filterType.value || filterType.value === 'any';
  };

  var filterByPrice = function (flat) {
    switch (filterPrice.value) {
      case 'low':
        return flat.offer.price < 10000;
      case 'middle':
        return flat.offer.price >= 10000 && flat.offer.price < 50000;
      case 'high':
        return flat.offer.price >= 50000;
      default:
        return true;
    }
  };

  var filterByRooms = function (flat) {
    return parseInt(filterRooms.value, 10) === flat.offer.rooms || filterRooms.value === 'any';
  };

  var filterByGuests = function (flat) {
    return parseInt(filterGuests.value, 10) === flat.offer.guests || filterGuests.value === 'any';
  };

  var filterByFeatures = function (flat) {
    var checkedFeatures = filterFeatures.querySelectorAll(':checked');
    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return flat.offer.features.includes(checkedFeature.value);
    });
  };

  var onFiltersChange = function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.map.removePins();
    window.map.renderPins(window.map.pinsData);
  };

  disableFilters();

  window.filter = {
    init: initFilters,
    disable: disableFilters,
    get: getFilteredFlats,
  };
})();
