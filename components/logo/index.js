import $ from 'jquery'
import anime from 'animejs/lib/anime.es.js'

const ui = {
  logo: $('[data-logo]')
}

let animating = false

const animation = anime({
  targets: '[data-logo-line]',
  d: [
    {
      value:
        'M12,47.2256452 C46.1462269,73.7418817 79.6761189,87 112.589676,87 C145.503234,87 177.650874,73.7418817 209.032596,47.2256452 C241.296952,22.5947127 274.210895,10.2792464 307.774424,10.2792464 C341.337954,10.2792464 378.079812,22.5947127 418,47.2256452'
    }
  ],
  easing: 'easeInOutSine',
  duration: 1000,
  loop: true,
  direction: 'alternate'
})

animation.pause()

ui.logo
  .on('mouseover', () => {
    if (animating) {
      return
    }

    animating = true
    animation.play()
  })
  .on('mouseout', () => {
    if (!animating) {
      return
    }

    animation.restart()
    animation.pause()
    animating = false
  })
