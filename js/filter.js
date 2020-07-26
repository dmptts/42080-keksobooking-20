'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var flatTypeFilter = document.querySelector('#housing-type');

  // var initFilters = function () {
  //   filters.style.opacity = 1;
  // };

  var initFilters = function () {
    filters.style.opacity = 1;
    filters.addEventListener('change', onFlatTypeFilterChange);
  };

  var onFlatTypeFilterChange = function (evt) {
    evt.preventDefault();
  };

  filters.style.opacity = 0;

  window.filter = {
    init: initFilters
  };
})();
