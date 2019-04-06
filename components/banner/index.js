import $ from 'jquery'

const ui = {
  banner: $('[data-banner]')
}

setTimeout(() => {
  ui.banner.addClass('banner--visible')
}, 10000)

setTimeout(() => {
  ui.banner.removeClass('banner--visible')
}, 25000)

$(window).on('scroll', () => {
  console.log($(window).scrollTop)
})
