import $ from 'jquery'

$(function() {
  const ui = {
    cards: $('[data-card]'),
    modal: $('[data-modal]'),
    container: $('[data-modal-container]'),
    close: $('[data-modal-close]')
  }
  let isActive = false

  if (ui.modal.hasClass('is-active')) {
    isActive = true
  }

  ui.cards.on('click', e => {
    const target = $(e.target)

    if (target.attr('data-link') || target.parents('[data-link]').length) {
      return
    }

    ui.modal
      .css('display', 'flex')
      .delay(10)
      .animate(
        {
          opacity: 1
        },
        100
      )

    ui.container
      .css('display', 'block')
      .delay(150)
      .animate(
        {
          opacity: 1
        },
        100
      )

    isActive = true
  })

  ui.close.on('click', closeModal)

  ui.modal.on('click', e => {
    if ($(e.target).is('[data-modal]')) {
      closeModal()
    }
  })

  $('body').on('keyup', e => {
    if (e.keyCode === 27) {
      closeModal()
    }
  })

  function closeModal() {
    if (!isActive) {
      return
    }

    ui.modal.add(ui.container).css({
      display: 'none',
      opacity: 0
    })

    isActive = false
  }
})
