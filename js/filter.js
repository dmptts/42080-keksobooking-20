'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var FILTER_ANY_VALUE = 'any';

  var filters = document.querySelector('.map__filters');
  var filterInputs = filters.querySelectorAll('.map__filter, .map__features');
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, arguments);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var initFilters = function () {
    filters.classList.remove('map__filters--hidden');
    window.form.toggleInputs(filterInputs, false);
    filters.addEventListener('change', onFiltersChange);
  };

  var disableFilters = function () {
    filters.classList.add('map__filters--hidden');
    window.form.toggleInputs(filterInputs, true);
    filters.reset();
    filters.removeEventListener('change', onFiltersChange);
  };

  var getFilteredFlats = function (data) {
    var filteredPins = [];
    for (var i = 0; i < data.length; i++) {
      if (filteredPins.length < window.map.MAX_PINS_COUNT && checkFlat(data[i])) {
        filteredPins.push(data[i]);
      }
    }
    return filteredPins;
  };

  var checkFlat = function (flat) {
    return (filterByType(flat) && filterByPrice(flat) && filterByRooms(flat)) && filterByGuests(flat) && filterByFeatures(flat);
  };

  var filterByType = function (flat) {
    return flat.offer.type === filterType.value || filterType.value === FILTER_ANY_VALUE;
  };

  var filterByPrice = function (flat) {
    switch (filterPrice.value) {
      case 'low':
        return flat.offer.price < LOW_PRICE;
      case 'middle':
        return flat.offer.price >= LOW_PRICE && flat.offer.price < HIGH_PRICE;
      case 'high':
        return flat.offer.price >= HIGH_PRICE;
      default:
        return true;
    }
  };

  var filterByRooms = function (flat) {
    return parseInt(filterRooms.value, 10) === flat.offer.rooms || filterRooms.value === FILTER_ANY_VALUE;
  };

  var filterByGuests = function (flat) {
    return parseInt(filterGuests.value, 10) === flat.offer.guests || filterGuests.value === FILTER_ANY_VALUE;
  };

  var filterByFeatures = function (flat) {
    var checkedFeatures = filterFeatures.querySelectorAll(':checked');
    return [].every.call(checkedFeatures, function (checkedFeature) {
      return flat.offer.features.includes(checkedFeature.value);
    });
  };

  var onFiltersChange = debounce(function () {
    window.card.remove();
    window.map.removePins();
    window.map.renderPins(window.map.pinsData);
  });

  disableFilters();

  window.filter = {
    init: initFilters,
    disable: disableFilters,
    get: getFilteredFlats,
  };
})();
