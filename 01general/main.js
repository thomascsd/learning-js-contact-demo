var $form = $('#addForm');
$form.on('submit', add);
$(document).on('click', '.edit-btn', edit);
$(document).on('click', '.update-btn', update);

$form.validate();

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

  var html =
    '<tr><td><input type="button" value="edit" class="btn btn-primary edit-btn"/>' +
    '<input type="button" value="update" class="btn btn-primary update-btn edit-update"/></td>' +
    '<td class="edit-name">' +
    '<input type="text" class="edit-update" value="' +
    name +
    '" />' +
    '<span class="edit-text">' +
    name +
    '</span>' +
    '</td><td class="edit-email">' +
    '<input type="text" class="edit-update" value="' +
    email +
    '" />' +
    '<span class="edit-text">' +
    email +
    '</span>' +
    '</td><td class="edit-mobile">' +
    '<input type="text" class="edit-update" value="' +
    mobile +
    '" />' +
    '<span class="edit-text">' +
    mobile +
    '</span>' +
    '</td></tr>';
  $('#contactList').append(html);
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

  changeValue($tr, '.edit-name');
  changeValue($tr, '.edit-email');
  changeValue($tr, '.edit-mobile');

  $tr.find('.edit-update').hide();
  $tr.find('.edit-text').show();
  $self.hide();
  $('.edit-btn').show();
}

function changeValue($tr, selector) {
  var $td = $tr.find(selector);
  var $text = $td.find('input');
  var $span = $td.find('span');

  $span.html($text.val());
}
