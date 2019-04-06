import $ from 'jquery'

$('body').on('submit', '[data-newsletter]', function(e) {
  e.preventDefault()

  if (
    !$(this)
      .find('[data-email]')
      .val()
  ) {
    return
  }

  $(this)
    .find('[data-submit]')
    .addClass('is-disabled')
    .val('Signing up...')

  $.ajax({
    url:
      '//digitalsurgeons.us1.list-manage.com/subscribe/post-json?u=6a140f08bdc3761f4eea1d618&amp;id=0e13afefa7&c=?',
    dataType: 'jsonp',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: $(this).serialize()
  }).done(() => {
    $(this).html('<strong>Thanks for signing up!</strong>')
  })
})
