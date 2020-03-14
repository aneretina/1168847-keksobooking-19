'use strict';

(function () {
  var PageLimits = {
    MIN_X: 1 - window.pin.Size.WIDTH / 2,
    MAX_X: 1200 - window.pin.Size.WIDTH / 2,
    MIN_Y: 130 - window.pin.Size.HEIGHT,
    MAX_Y: 630 - window.pin.Size.HEIGHT
  };

  var startCoords;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pinLeft = window.map.mainPin.offsetLeft - shift.x;
    var pinTop = window.map.mainPin.offsetTop - shift.y;

    if (pinLeft >= PageLimits.MIN_X && pinLeft <= PageLimits.MAX_X) {
      window.map.mainPin.style.left = pinLeft + 'px';
    }

    if (pinTop >= PageLimits.MIN_Y && pinTop <= PageLimits.MAX_Y) {
      window.map.mainPin.style.top = pinTop + 'px';
    }

    window.map.setPinCoordinates();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.map.mainPin.addEventListener('mousedown', onMouseDown);

})();
