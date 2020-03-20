'use strict';

(function () {
  var RoomPrice = {
    LOW: {
      min: 0,
      max: 10000
    },
    MIDDLE: {
      min: 10000,
      max: 50000
    },
    HIGH: {
      min: 50000,
      max: Infinity
    }
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var mapFilters = document.querySelector('.map__filters');
  var filterOptType = document.querySelector('#housing-type');
  var filterOptPrice = document.querySelector('#housing-price');
  var filterOptRoom = document.querySelector('#housing-rooms');
  var filterOptGuest = document.querySelector('#housing-guests');
  var filterOptFeature = mapFilters.querySelector('#housing-features');
  var filterUnits = mapFilters.querySelectorAll('select, input');


  var filterOffers = function (offers) {
    var pins = [];

    var checkFeatureInputs = filterOptFeature.querySelectorAll('input[type = "checkbox"]:checked');

    for (var i = 0; i < offers.length; i++) {
      var isFeatured = true;

      if (pins.length === window.pin.count) {
        break;
      }

      if ((filterOptType.value === 'any' || offers[i].offer.type === filterOptType.value) &&
      (filterOptPrice.value === 'any' || offers[i].offer.price >= RoomPrice[filterOptPrice.value.toUpperCase()].min &&
      offers[i].offer.price <= RoomPrice[filterOptPrice.value.toUpperCase()].max) &&
      (filterOptRoom.value === 'any' || offers[i].offer.rooms === Number(filterOptRoom.value)) &&
      (filterOptGuest.value === 'any' || offers[i].offer.guests === Number(filterOptGuest.value))) {

        checkFeatureInputs.forEach(function (element) {
          if (!offers[i].offer.features.includes(element.value)) {
            isFeatured = false;
          }
        });

        if (isFeatured) {
          pins.push(offers[i]);
        }
      }
    }
    return pins;
  };

  mapFilters.addEventListener('change', function () {
    window.pin.remove();
    window.card.close();

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pin.render(filterOffers(window.data));
    }, DEBOUNCE_INTERVAL);
  });

  var deactivateFilters = function () {
    filterUnits.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };


  var activateFilters = function () {
    filterUnits.forEach(function (item) {
      item.removeAttribute('disabled', 'disabled');
    });
  };

  deactivateFilters();

  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters,
    map: mapFilters,
    data: filterOffers,
  };

})();
