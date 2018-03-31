var url = 'https://member-819d.restdb.io/rest/contact';
var httpMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT'
};

function ajax(method, url, data, callback) {
  var settings = {
    crossDomain: true,
    url: url,
    method: method,
    headers: {
      'content-type': 'application/json',
      'x-apikey': '5aa7fea3f0a7555103cea428',
      'cache-control': 'no-cache'
    },
    success: callback
  };

  if (data) {
    settings.processData = false;
    settings.data = JSON.stringify(data);
  }

  $.ajax(settings);
}
