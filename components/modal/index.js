import $ from 'jquery'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

$(() => {
  const ui = {
    grid: $('[data-grid]'),
    cards: $('[data-card]')
  }
  let isActive = false
  let ctrl = false

  let docTitle = document.title

  // if data-modal already exists then we must be on a single entry page
  // e.g /crawl/slug
  // set active to true so JS can take over
  if ($('[data-modal]').length) {
    isActive = true

    // if no modal in document then fetch from template tag ready to open with JS
  } else {
    $('body').append(
      $(document.importNode($('[data-modal-template]')[0].content, true))
    )
  }

  // either way update UI object with modal
  ui.modal = $('[data-modal]')
  ui.container = ui.modal.find('[data-modal-container]')
  ui.close = $('[data-modal-close]')

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

  ui.grid.on('click', '[data-card]', function(e) {
    const target = $(e.target)

    // if share / original URL links clicked then ignore
    if (target.attr('data-link') || target.parents('[data-link]').length) {
      return
    }

    e.preventDefault()

    // crawl data parsed from stringified object in attribute
    const crawlData = JSON.parse($(this).attr('data-card'))

    if (ctrl) {
      window.open(crawlData.originalUrl)
      return
    }

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

    ctrl = false
  })

  $('body').on('keydown', e => {
    if ([17, 91].includes(e.keyCode)) {
      ctrl = true
    }
  })

  // update modal info with new crawl data
  function updateModal(data) {
    ui.modal.find('[data-title]').html(data.title)
    ui.modal
      .find('[data-date]')
      .html(data.date.human)
      .attr('datetime', data.date.machine)

    const descEl = ui.modal.find('[data-description]')
    if (data.description) {
      descEl
        .html(data.description)
        .parent()
        .show()
    } else {
      descEl.parent().hide()
    }

    ui.modal
      .find('[data-link]')
      .attr('href', data.originalUrl)
      .find('span')
      .html(data.originalUrl)

    ui.modal.find('[data-image]').attr('src', data.image)

    const tagsEl = ui.modal.find('[data-tags]')
    if (data.tags.length) {
      let tags = ''
      data.tags.forEach(tag => {
        tags += `
          <li class="tags__item">
            <a class="tags__tag" href="/tag/${tag}/">
              ${tag}
            </a>
          </li>
        `
      })
      tagsEl
        .html(tags)
        .parent()
        .show()
    } else {
      tagsEl.parent().hide()
    }

    document.title = `${data.title} | Audiocrawl`

    openModal()
  }

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
      modalContainer.removeClass('is-active is-visible')
    }, 150)

    isActive = false
    document.title = docTitle
    history.goBack()
  }
})
