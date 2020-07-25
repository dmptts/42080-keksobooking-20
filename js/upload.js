'use strict';

(function () {
  window.upload = function (url, data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
