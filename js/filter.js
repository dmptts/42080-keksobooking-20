'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterType = document.querySelector('#housing-type');

  var initFilters = function () {
    filters.classList.remove('map__filters--hidden');
    filters.addEventListener('change', onFiltersChange);
  };

  var disableFilters = function () {
    filters.classList.add('map__filters--hidden');
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
    return (filterByType(flat)); // Здесь позже будут другие функции фильтра
  };

  var filterByType = function (flat) {
    return flat.offer.type === filterType.value || filterType.value === 'any';
  };

  var onFiltersChange = function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.map.removePins();
    window.map.renderPins(window.map.pinsData);
  };

  filters.classList.add('map__filters--hidden');

  window.filter = {
    init: initFilters,
    disable: disableFilters,
    get: getFilteredFlats
  };
})();
