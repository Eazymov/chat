<template lang="html">

  <div id="App">
    <md-tabs md-elevation="2"
             md-centered
             class="md-accent"
             @change="setPageTitle">
      <md-tab md-label="Login" :md-active="address === '/login'">
        <login-form />
      </md-tab>

      <md-tab md-label="Signup" :md-active="address === '/signup'">
        <signup-form />
      </md-tab>
    </md-tabs>
  </div>

</template>

<script>
  import LoginForm from './components/login-form.vue'
  import SignupForm from './components/signup-form.vue'

  export default {
    components: {
      LoginForm,
      SignupForm
    },

    computed: {
      address () {
        return window.location.pathname;
      }
    },

    methods: {
      setPageTitle (index) {
        document.title = (index === 0) ? 'Login' : 'Signup'
      }
    }
  }
</script>

<style lang="sass">
  *,
  *::before,
  *::after
    outline: none
    padding: 0
    margin: 0

  html,
  body
    height: 100%
    width: 100%

  #App
    font-family: Roboto, Noto-sans, Noto, sans-serif
    color: rgba(#000, .87)
    font-size: 16px
    background-color: #eee
    display: flex
    justify-content: center
    height: 100%
    width: 100%
</style>
