<template lang="pug">
  div(id="App")
    App-header

    section(id="content")
      App-sidebar(id="sidebar" class="md-transparent")
      transition(name="route" mode="out-in" appear)
        router-view(id="view")
</template>

<script>
  import AppHeader from './components/header/appHeader.vue'
  import AppSidebar from './components/appSidebar.vue'

  export default {
    components: {
      AppHeader,
      AppSidebar
    },

    beforeCreate () {
      this.$store.dispatch('getCurrentUser');
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

  a
    color: inherit
    &:hover
      text-decoration: inherit

  input,
  select,
  button,
  textarea
    font-family: inherit

  html,
  body
    height: 100%
    width: 100%

  #App
    font-family: Roboto, Noto-sans, Noto, sans-serif
    background-color: #eee
    color: rgba(#000, .87)
    align-items: center
    padding-top: 48px
    min-height: 100%
    font-size: 16px
    width: 100%

    #content
      justify-content: center
      flex-direction: row
      padding-left: 180px
      display: flex
      margin: auto
      width: 0
      #view
        min-height: calc(100% - 78px)
        overflow: visible
        margin: 15px auto
        flex-grow: 0

  .route-enter
    transform: translateY(30px)
    position: fixed
    opacity: 0
  .route-enter-to
    transform: translateY(0)
    transition: opacity .7s, transform .5s
    position: fixed
    opacity: 1
</style>
