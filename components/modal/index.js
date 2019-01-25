import $ from 'jquery'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

$(function() {
  const ui = {
    cards: $('[data-card]'),
    close: $('[data-modal-close]')
  }
  let isActive = false
  let crawlData = {}

  if ($('[data-modal]').hasClass('is-active')) {
    isActive = true
  } else {
    const modalTmpl = $('[data-modal-template]')[0]
    $('body').append($(document.importNode(modalTmpl.content, true)))
  }

  ui.modal = $('[data-modal]')
  ui.container = ui.modal.find('[data-modal-container]')

  history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
  })

  ui.cards.on('click', function(e) {
    const target = $(e.target)

    e.preventDefault()

    crawlData = JSON.parse($(this).attr('data-card'))

    if (target.attr('data-link') || target.parents('[data-link]').length) {
      return
    }

    openModal(crawlData)
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

  function openModal(data) {
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

    history.push(`/crawl/${crawlData.slug}`, data)
    isActive = true
  }

  function closeModal() {
    if (!isActive) {
      return
    }

    ui.modal.add(ui.container).css({
      display: 'none',
      opacity: 0
    })

    isActive = false
    history.goBack()
  }
})
