import $ from 'jquery'

$(function() {
  const ui = {
    container: $('[data-search]'),
    input: $('[data-search-input]')
  }

  ui.input
    .on('focus', () => {
      ui.container.addClass('is-active')
    })
    .on('blur', () => {
      ui.container.removeClass('is-active')
    })
})
