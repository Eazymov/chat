import Vue from 'vue'
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: {
    color: 'blue',
    hue: 500
  },
  accent: {
    color: 'blue',
    hue: 500
  },
  warn: 'red',
  background: 'white'
})
