'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo img');
  var avatarDefault = avatarPreview.src;
  var photoDefault = photoPreview.src;

  function setDefaultImages() {
    avatarPreview.src = avatarDefault;
    photoPreview.src = photoDefault;
  }

  var uploadImage = function (input, img) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    uploadImage(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    var photoImg = document.createElement('img');
    photoImg.classList.add('ad-form__photo-img');
    uploadImage(photoChooser, photoPreview);
    photoPreview.appendChild(photoImg);
  });

  window.image = {
    setDefaultImages: setDefaultImages,
  };

})();
