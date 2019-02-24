import $ from 'jquery'

const ui = {
  listing: $('[data-listing]'),
  loadMore: $('[data-load-more]')
}

let url = '/api/crawls.json'

ui.loadMore.click(() => {
  $.get(url, response => {
    if (response.data.length) {
      console.log(response.data)
    }

    if (response.meta.pagination.links.next) {
      url = response.meta.pagination.links.next
    } else {
      ui.loadMore.hide()
    }
  })
})
