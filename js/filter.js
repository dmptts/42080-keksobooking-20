'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var flatTypeFilter = document.querySelector('#housing-type');
  var filteredPins = [];

  var initFilters = function () {
    filters.style.opacity = 1;
    filters.addEventListener('change', onFlatTypeFilterChange);
  };

  var disableFilters = function () {
    filters.style.opacity = 0;
    filters.reset();
  };

  var filterFlatsByType = function () {
    window.map.removePins();

    if (flatTypeFilter.value !== 'any') {
      filteredPins = window.map.pinsData.filter(function (it) {
        return it.offer.type === flatTypeFilter.value;
      });
      window.map.renderPins(filteredPins);
    } else {
      window.map.renderPins(window.map.pinsData);
    }
  };

  var onFlatTypeFilterChange = function (evt) {
    evt.preventDefault();
    window.card.remove();
    filterFlatsByType();
  };

  filters.style.opacity = 0;

  window.filter = {
    init: initFilters,
    disable: disableFilters
  };
})();
