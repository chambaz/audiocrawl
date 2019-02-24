import $ from 'jquery'

const ui = {
  grid: $('[data-grid]'),
  loadMore: $('[data-load-more]'),
  tmpl: $(document.importNode($('[data-card-template]')[0].content, true))
}

let url = '/api/crawls.json?page=2'
let loading = false

ui.loadMore.click(() => {
  if (loading) {
    return false
  }

  loading = true
  ui.loadMore.html('Loading...')

  $.get(url, response => {
    if (response.data.length) {
      response.data.forEach(card => {
        ui.grid.append(renderCard(card))
      })
    }

    // if next link available then update url otherwise hide button as no more pages
    if (response.meta.pagination.links.next) {
      url = response.meta.pagination.links.next
      ui.loadMore.html('Load More')
    } else {
      ui.loadMore.hide()
    }

    loading = false
  })
})

// render card from template
function renderCard(card) {
  const tmpl = ui.tmpl.clone()

  tmpl.find('[data-card]').attr('data-card', JSON.stringify(card))

  tmpl
    .find('[data-card-title]')
    .html(card.title)
    .attr('href', card.url)

  tmpl
    .find('[data-card-image]')
    .attr('href', card.url)
    .find('img')
    .attr('src', card.image)

  tmpl.find('[data-card-original-url]').attr('href', card.originalUrl)

  return tmpl
}
