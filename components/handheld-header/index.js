import $ from 'jquery'

$(function() {
  const ui = {
    hamburger: $('[data-hamburger]'),
    close: $('[data-sidebar-close]'),
    sidebar: $('[data-sidebar]')
  }

  ui.hamburger.on('click', () => {
    ui.sidebar.addClass('is-active')
  })

  ui.close.on('click', () => {
    ui.sidebar.removeClass('is-active')
  })
})
