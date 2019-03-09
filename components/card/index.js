import $ from 'jquery'

$(function() {
  const ui = {
    image: $('[data-card-image]')
  }

  ui.image
    .on('mouseover', function() {
      $(this)
        .parent()
        .find('[data-card-title]')
        .addClass('is-active')
    })
    .on('mouseout', function() {
      $(this)
        .parent()
        .find('[data-card-title]')
        .removeClass('is-active')
    })
})
