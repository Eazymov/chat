<template lang="pug">
  md-whiteframe(md-elevation="2" md-tag="header" id="header")
    section(id="toolbar")
      div(class="logo")
        a(href="#/") k3k
        //- img(src="../../../../public/files/icons/vuejs.png")

      App-search-panel

      App-user-menu
</template>

<script>
  import AppSearchPanel from './appSearchPanel.vue'
  import AppUserMenu from './appUserMenu.vue'

  export default {
    components: {
      AppSearchPanel,
      AppUserMenu
    }
  }
</script>

<style lang="sass">
  #header
    background-color: #2196f3
    position: fixed
    height: 48px
    width: 100%
    z-index: 3
    left: 0
    top: 0

  #toolbar
    flex-direction: row
    flex-wrap: wrap
    margin: 0 auto
    width: 1150px
    display: flex
    height: 100%

    .logo
      align-self: flex-start
      padding: 0 53px
      width: 180px
      height: 100%
      a
        text-decoration: none
        line-height: 48px
        font-weight: 600
        letter-spacing: 2px
        font-size: 2rem
        color: #fff
      img
        width: 40px

</style>
