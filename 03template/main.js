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
  var source = $('#rowItem').html();
  var template = Handlebars.compile(source);
  var html = template({ items: items });

  $('#contactList>tbody').html(html);
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

  var objid = $tr.find('.objid').val();
  var name = changeValue($tr, '.edit-name');
  var email = changeValue($tr, '.edit-email');
  var mobile = changeValue($tr, '.edit-mobile');

  $tr.find('.edit-update').hide();
  $tr.find('.edit-text').show();
  $self.hide();
  $('.edit-btn').show();

  ajax(
    httpMethods.put,
    url + '/' + objid,
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
