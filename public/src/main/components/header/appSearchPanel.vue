<template lang="pug">
  div.search-panel
    form
      input(placeholder="Search")
      button(type="submit")
        md-icon search
</template>

<script>
  export default {

  }
</script>

<style lang="sass">
  .search-panel
    align-self: flex-start
    padding: 8px 10px
    flex-grow: 1
    width: 300px
    height: 100%
    form
      position: relative
      width: 300px
      height: 32px
      input
        background-color: rgba(#fff, .05)
        border: 1px solid rgba(#fff, .75)
        box-shadow: 0 0 1px #fff
        padding: 0 10px 0 33px
        border-radius: 15px
        font-weight: 400px
        line-height: 26px
        font-size: .9rem
        transition: .1s
        height: 100%
        color: #fff
        width: 100%
        &::-webkit-input-placeholder
          color: rgba(#fff, .7)
        &::-moz-placeholder
          color: rgba(#fff, .7)
        &:-ms-input-placeholder
          color: rgba(#fff, .7)
        &:-moz-placeholder
          color: rgba(#fff, .7)
        &:hover
          background-color: rgba(#fff, .2)
        &:focus
          background-color: #fff
          color: rgba(#000, .87)
          & + button .md-icon
            color: #ccc

      button
        background-color: transparent
        position: absolute
        cursor: pointer
        border: none
        height: 100%
        z-index: 2
        left: 0
        top: 0
        .md-icon
          color: rgba(#fff, .6)
          position: absolute
          left: 7px
          top: 5px
</style>
