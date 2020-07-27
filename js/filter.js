'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterType = document.querySelector('#housing-type');
  var filteredPins = [];

  var initFilters = function () {
    filters.classList.remove('map__filters--hidden');
    filters.addEventListener('change', onFiltersChange);
  };

  var disableFilters = function () {
    filters.classList.add('map__filters--hidden');
    filters.reset();
  };

  var getFilteredFlats = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (checkFlat(data[i])) {
        filteredPins.push(data[i]);
      }
    }
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
    filteredPins = [];
    getFilteredFlats(window.map.pinsData);
    window.map.renderPins(filteredPins);
  };

  filters.classList.add('map__filters--hidden');

  window.filter = {
    init: initFilters,
    disable: disableFilters
  };
})();
