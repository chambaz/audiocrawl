import $ from 'jquery'

$(function() {
  const ui = {
    field: $('[data-input-field]')
  }

  ui.field
    .on('focus', function() {
      $(this)
        .parent('[data-input]')
        .addClass('is-active')
    })
    .on('blur', function() {
      const $this = $(this)

      if (!$this.val().length) {
        $(this)
          .parent('[data-input]')
          .removeClass('is-active')
      }
    })
})
