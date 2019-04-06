const ui = {
  banner: document.querySelector('[data-banner]')
}

setTimeout(() => {
  ui.banner.classList.add('banner--visible')
}, 10000)

setTimeout(() => {
  ui.banner.classList.remove('banner--visible')
}, 25000)
