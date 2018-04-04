function login() {
  const url = 'https://member-819d.restdb.io/rest/contactuser';

  ajax(httpMethods.get, url).done(datas => checkUserId(datas));
}

function checkUserId(datas) {
  const userId = $('#userId').val();
  const pwd = $('#pwd').val();

  data = datas.filter(item => item.userId === userId && item.password === pwd);

  if (data) {
    sessionStorage.setItem('contact-role', data.role[0]);
    location.href = 'index.html';
  }
}
