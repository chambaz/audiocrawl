import $ from 'jquery'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

$(function() {
  const ui = {
    cards: $('[data-card]'),
    close: $('[data-modal-close]')
  }
  let isActive = false

  // if data-modal already exists then we must be on a single entry page
  // e.g /crawl/slug
  // set active to true so JS can take over
  if ($('[data-modal]').length) {
    isActive = true

    // if no modal in document then fetch from template tag ready to open with JS
  } else {
    const modalTmpl = $('[data-modal-template]')[0]
    $('body').append($(document.importNode(modalTmpl.content, true)))
  }

  // either way update UI object with modal
  ui.modal = $('[data-modal]')
  ui.container = ui.modal.find('[data-modal-container]')

  history.listen(location => {
    // if home path then close modal
    if (location.pathname == '/') {
      closeModal()

      // if single entry URL e.g /crawl/slug
      // update modal content
    } else if (location.pathname.includes('crawl')) {
      updateModal(location.state)
    }
  })

  ui.cards.on('click', function(e) {
    const target = $(e.target)

    e.preventDefault()

    // if share / original URL links clicked then ignore
    if (target.attr('data-link') || target.parents('[data-link]').length) {
      return
    }

    // crawl data parsed from stringified object in attribute
    const crawlData = JSON.parse($(this).attr('data-card'))

    // update history to single entry slug and store crawl data in state
    history.push(`/crawl/${crawlData.slug}/`, crawlData)
  })

  // close modal on close icon click or anywhere outside of modal content area
  ui.close.on('click', closeModal)
  ui.modal.on('click', e => {
    if ($(e.target).is('[data-modal]')) {
      closeModal()
    }
  })

  // close modal on escape key press
  $('body').on('keyup', e => {
    if (e.keyCode === 27) {
      closeModal()
    }
  })

  // update modal info with new crawl data
  function updateModal(data) {
    ui.modal.find('[data-title]').html(data.title)
    ui.modal
      .find('[data-date]')
      .html(data.date.human)
      .attr('datetime', data.date.machine)
    ui.modal.find('[data-description]').html(data.description)

    ui.modal
      .find('[data-link]')
      .attr('href', data.originalUrl)
      .find('span')
      .html(data.originalUrl)

    ui.modal.find('[data-image]').attr('src', data.image)

    let tags = ''
    data.tags.forEach(tag => {
      tags += `
        <li class="tags__item">
          <a class="tags__tag" href="#">${tag.title}</a>
        </li>
      `
    })
    ui.modal.find('[data-tags]').html(tags)

    openModal()
  }

  function openModal() {
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
