var contacts = [];

$('#add').on('click', addContact);
$(document).on('click', '.edit-btn', editData);

function addContact() {
  var name = $('#contactName').val();
  var email = $('#email').val();
  var mobile = $('#mobile').val();

  contacts.push({
    name: name,
    email: email,
    mobile: mobile
  });

  loadData();
}

function loadData() {
  var items = [];

  for (let i = 0; i < contacts.length; i++) {
    var contact = contacts[i];

    items.push(
      '<tr><td><input type="button" value="edit" class="edit-btn"/></td>' +
      '<td class="edit-name">' +
      '<input type="text" class="edit-update" value="' + contact.name + '" />' +
      '<span class="edit-text">' + contact.name + '</span>' +
      '</td><td class="edit-email">' +
      '<input type="text" class="edit-update" value="' + contact.email + '" />' +
      '<span class="edit-text">' + contact.email + '</span>' +
      '</td><td class="edit-mobile">' +
      '<input type="text" class="edit-update" value="' + contact.mobile + '" />' +
      '<span class="edit-text">' + contact.mobile + '</span>' +
      '</td></tr>'
    );
  }

  $('#contactList').html('<tr><th></th><th>name</th><th>email</th><th>mobile</th></tr>' + items.join(''));
}

function editData() {
  var $self = $(this);
  var $tr = $self.parents('tr');

  $tr.find('.edit-update').show();
  $tr.find('.edit-text').hide();
}