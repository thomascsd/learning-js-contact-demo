import * as $ from 'jquery';

export const httpMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT'
};

export function ajax(method, url, data) {
  const settings = {
    crossDomain: true,
    url: url,
    method: method,
    headers: {
      'content-type': 'application/json',
      'x-apikey': '5aa7fea3f0a7555103cea428',
      'cache-control': 'no-cache'
    }
  };

  if (data) {
    settings.processData = false;
    settings.data = JSON.stringify(data);
  }

  return $.ajax(settings);
}