import * as $ from 'jquery';
import {
  Handlebars
} from 'handlebars';
import {
  httpMethods,
  ajax
} from './shared';
import 'jquery-validation';

const contactUrl = 'https://member-819d.restdb.io/rest/contact';
const $form = $('#addForm');
const $formContainer = $('.add-form-container').hide();
const role = sessionStorage.getItem('contact-role');
const roleName = {
  admin: 'admin',
  viewer: 'viewer'
};

if (!role && location.pathname.indexOf('login.html') == -1) {
  location.href = 'login.html';
}

if (role === roleName.admin) {
  $formContainer.show();
}

$form.on('submit', add);
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
  const name = $('#contactName').val();
  const email = $('#email').val();
  const mobile = $('#mobile').val();

  ajax(httpMethods.post, contactUrl, {
      name: name,
      email: email,
      mobile: mobile
    })
    .done(loadData);
}

function loadData() {
  ajax(httpMethods.get, contactUrl).done(createTr);
}

function createTr(items) {
  const source = $('#rowItem').html();
  const template = Handlebars.compile(source);
  const html = template({
    items: items,
    isAdmin: role === roleName.admin
  });

  $('#contactList>tbody').html(html);
}

function edit() {
  const $self = $(this);
  const $tr = $self.parents('tr');

  $tr.find('.edit-update').show();
  $tr.find('.edit-text').hide();
  $self.hide();
}

function update() {
  const $self = $(this);
  const $tr = $self.parents('tr');

  const objid = $tr.find('.objid').val();
  const name = changeValue($tr, '.edit-name');
  const email = changeValue($tr, '.edit-email');
  const mobile = changeValue($tr, '.edit-mobile');

  $tr.find('.edit-update').hide();
  $tr.find('.edit-text').show();
  $self.hide();
  $('.edit-btn').show();

  ajax(httpMethods.put, contactUrl + '/' + objid, {
      name: name,
      email: email,
      mobile: mobile
    })
    .done(loadData);
}

function changeValue($tr, selector) {
  const $td = $tr.find(selector);
  const $text = $td.find('input');
  const $span = $td.find('span');

  $span.html($text.val());

  return $text.val();
}