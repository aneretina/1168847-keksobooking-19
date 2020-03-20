'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo img');


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function () {
    var photoFile = photoChooser.files[0];

    var photoFileName = photoFile.name.toLowerCase();

    var photoMatches = FILE_TYPES.some(function (it) {
      return photoFileName.endsWith(it);
    });

    if (photoMatches) {
      var photoReader = new FileReader();

      photoReader.addEventListener('load', function () {
        var photoImg = document.createElement('img');
        photoImg.src = photoReader.result;
        photoImg.width = '70';
        photoImg.height = '70';
        photoPreview.appendChild(photoImg);
      });

      photoReader.readAsDataURL(photoFile);
    }
  });

})();
