<template lang="html">
  <div id="App">

    <router-view></router-view>
  </div>
</template>

<script>
  export default {

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
    background-color: #eee
    color: rgba(#000, .87)
    font-size: 16px
    height: 100%
    width: 100%

</style>
