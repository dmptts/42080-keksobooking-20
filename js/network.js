'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_URL = 'https://javascrsipt.pages.academy/keksobooking';

  var configureXHR = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    configureXHR(xhr, onSuccess, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    configureXHR(xhr, onSuccess, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
