import $ from 'jquery'

const ui = {
  mailchimpForm: '[data-mailchimp-form]'
}

$(ui.mailchimpForm).on('submit', e => {
  e.preventDefault()
  alert('submit mailchimp')
})
