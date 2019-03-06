import * as $ from 'jquery';
import {
  ajax,
  httpMethods
} from './shared';

$('#login').on('click', login);

function login() {
  const url = 'https://member-819d.restdb.io/rest/contactuser';

  ajax(httpMethods.get, url)
    .done(datas => checkUserId(datas));
}

function checkUserId(datas) {
  const userId = $('#userId').val();
  const pwd = $('#pwd').val();

  datas = datas.filter(
    item => item.userId === userId && item.password === pwd
  );

  if (datas && datas.length) {
    sessionStorage.setItem('contact-role', datas[0].role[0].roleName);
    location.href = 'index.html';
  }
}