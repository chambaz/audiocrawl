import $ from 'jquery'

$(function() {
  const ui = {
    label: $('[data-search-label]'),
    input: $('[data-search-input]')
  }

  ui.input
    .on('focus', () => {
      ui.label.addClass('is-active')
    })
    .on('blur', () => {
      ui.label.removeClass('is-active')
    })
})
