'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterOptType = document.querySelector('#housing-type');


  var filterOffers = function (offers) {
    var pins = [];

    for (var i = 0; i < offers.length; i++) {
      if (pins.length === window.pin.count) {
        break;
      }

      if (offers[i].offer.type !== filterOptType.value && filterOptType.value !== 'any') {
        continue;
      }
      pins.push(offers[i]);
    }
    return pins;
  };


  filters.addEventListener('change', function () {
    window.pin.remove();
    window.card.close();
    window.pin.render(filterOffers(window.data));
  });

  window.filter = {
    data: filterOffers,
  };

})();
