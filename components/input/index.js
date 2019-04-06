import $ from 'jquery'

$(function() {
  $('body')
    .on('focus', '[data-input-field]', function() {
      $(this)
        .parent('[data-input]')
        .addClass('is-active')
    })
    .on('blur', '[data-input-field]', function() {
      const $this = $(this)

      if (!$this.val().length) {
        $(this)
          .parent('[data-input]')
          .removeClass('is-active')
      }
    })
})
