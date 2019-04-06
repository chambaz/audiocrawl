import $ from 'jquery'
import exitIntent from 'exit-intent'

$(() => {
  $('body').append(
    $(document.importNode($('[data-exit-intent-template]')[0].content, true))
  )

  const ui = {
    modal: $('[data-exit-intent]'),
    container: $('[data-exit-intent-container]'),
    close: $('[data-exit-intent-close]')
  }

  let isActive = false

  exitIntent({
    onExitIntent: openModal
  })

  ui.close.on('click', closeModal)
  ui.modal.on('click', e => {
    if ($(e.target).is('[data-exit-intent]')) {
      closeModal()
    }
  })

  function openModal() {
    ui.modal
      .addClass('is-active')
      .delay(10)
      .animate(
        {
          opacity: 1
        },
        100
      )

    ui.container
      .addClass('is-active')
      .delay(150)
      .animate(
        {
          opacity: 1
        },
        100
      )

    isActive = true
  }

  function closeModal() {
    if (!isActive) {
      return
    }

    const modalContainer = ui.modal.add(ui.container)

    modalContainer.animate(
      {
        opacity: 0
      },
      100
    )

    setTimeout(() => {
      modalContainer.removeClass('is-active')
    }, 150)

    isActive = false
  }
})
