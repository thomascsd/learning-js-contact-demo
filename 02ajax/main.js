var url = 'https://member-819d.restdb.io/rest/contact';
var httpMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT'
};
var $form = $('#addForm');
$form.on('submit', add);
$('#send').on('click', send);
$(document).on('click', '.edit-btn', edit);
$(document).on('click', '.update-btn', update);

$form.validate();

loadData();

function add(e) {
  e.preventDefault();
  if ($form.valid()) {
    addContact();
  }
}

function addContact() {
  var name = $('#contactName').val();
  var email = $('#email').val();
  var mobile = $('#mobile').val();

  ajax(
    httpMethods.post,
    url,
    {
      name: name,
      email: email,
      mobile: mobile
    },
    loadData
  );
}

function loadData() {
  ajax(httpMethods.get, url, null, createTr);
}

function createTr(items) {
  var htmls = [];

  for (let i = 0; i < items.length; i++) {
    var item = items[i];
    var html =
      '<tr><td><input type="button" value="edit" class="btn btn-primary edit-btn"/>' +
      '<input type="button" value="update" class="btn btn-primary update-btn edit-update"/></td>' +
      '<td class="edit-name">' +
      '<input type="text" class="edit-update" value="' +
      item.name +
      '" />' +
      '<span class="edit-text">' +
      item.name +
      '</span>' +
      '</td><td class="edit-email">' +
      '<input type="text" class="edit-update" value="' +
      item.email +
      '" />' +
      '<span class="edit-text">' +
      item.email +
      '</span>' +
      '</td><td class="edit-mobile">' +
      '<input type="text" class="edit-update" value="' +
      item.mobile +
      '" />' +
      '<span class="edit-text">' +
      item.mobile +
      '</span>' +
      '</td></tr>';

    htmls.push(html);
  }

  $('#contactList>tbody').html(htmls.join(''));
}

function edit() {
  var $self = $(this);
  var $tr = $self.parents('tr');

  $tr.find('.edit-update').show();
  $tr.find('.edit-text').hide();
  $self.hide();
}

function update() {
  var $self = $(this);
  var $tr = $self.parents('tr');

  var name = changeValue($tr, '.edit-name');
  var email = changeValue($tr, '.edit-email');
  var mobile = changeValue($tr, '.edit-mobile');

  $tr.find('.edit-update').hide();
  $tr.find('.edit-text').show();
  $self.hide();
  $('.edit-btn').show();

  ajax(
    httpMethods.put,
    url,
    {
      name: name,
      email: email,
      mobile: mobile
    },
    loadData
  );
}

function changeValue($tr, selector) {
  var $td = $tr.find(selector);
  var $text = $td.find('input');
  var $span = $td.find('span');

  $span.html($text.val());

  return $text.val();
}

function send() {
  var contacts = [];
  var contact = {};

  $('#contactList')
    .find('tr')
    .each(function() {
      var $tr = $(this);
      contact = {};

      $tr.find('td').each(function() {
        var name = this.className.replace('edit-', '');
        contact[name] = $(this)
          .find('span')
          .html();
      });

      contacts.push(contact);
    });
  $('#sendText').html(JSON.stringify(contacts));
}

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
