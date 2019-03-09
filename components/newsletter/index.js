import $ from 'jquery'

const ui = {
  form: $('[data-newsletter]'),
  input: $('[data-email]'),
  submit: $('[data-submit]')
}

ui.form.on('submit', e => {
  e.preventDefault()

  if (!ui.input.val()) {
    return
  }

  ui.submit.addClass('is-disabled').val('Signing up...')

  $.ajax({
    url:
      '//digitalsurgeons.us1.list-manage.com/subscribe/post-json?u=6a140f08bdc3761f4eea1d618&amp;id=0e13afefa7&c=?',
    dataType: 'jsonp',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: ui.form.serialize()
  }).done(() => {
    ui.form.html('<strong>Thanks for signing up!</strong>')
  })
})
