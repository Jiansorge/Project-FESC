Vue.component('headline', {
  template: '<h1><img src="alligator-logo.png" alt="Alligator Logo">{{title}}</h1>'
})

document.addEventListener("DOMContentLoaded", function(){
  let headerApp = new Vue({
    el: '#headerApp'
  })
})
