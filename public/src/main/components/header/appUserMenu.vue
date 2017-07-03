<template lang="pug">
  div(class="user" @click="active = !active" :class="{ active }")

    span(class="user__name") {{ user.firstname }}
    md-avatar(class="user__avatar" :style="avatar")
    md-icon(class="show-menu-btn") keyboard_arrow_down

    ul(class="dropdown")
      li
        a(href="#/profile") Profile
      li
        a(href="#/settings") Edit
      li
        a(href="/logout" class="logout") Log out
</template>

<script>
  export default {
    data: () => ({
      active: false
    }),

    computed: {
      user () {
        return this.$store.state.currentUser;
      },

      avatar () {
        const url = `url(../../../../public/uploads/${this.user.avatar})`;

        return {
          'background-image': url
        }
      }
    }
  }
</script>

<style lang="sass">
  .user
    background-color: #2196f3
    padding: 0 20px 0 10px
    align-self: flex-end
    position: relative
    cursor: pointer
    &:hover,
    &.active
      background-color: #1e88e5
    &.active .dropdown
      visibility: visible
      bottom: -125px
      opacity: 1
    &__name
      font-weight: 500
      color: #fff
    &__avatar
      background-repeat: no-repeat
      background-size: cover
      margin: 6px 5px
      min-height: 36px
      min-width: 36px
      height: 36px
      width: 36px
    .show-menu-btn
      position: absolute
      color: rgba(#fff, .54)
      top: 12px
      right: 1px
      height: 8px

    .dropdown
      border: 1px solid #ccc
      background-color: #fff
      position: absolute
      border-radius: 2px
      visibility: hidden
      list-style: none
      transition: .15s
      padding: 4px 0
      bottom: -145px
      width: 120px
      transition-timing-function: ease-out step-end
      opacity: 0
      z-index: 3
      right: 10px
      &::after,
      &::before
        position: absolute
        border: 7px solid
        content: ''
        width: 14px
        height: 14px
        right: 24px
      &::after
        border-color: transparent transparent #fff
        top: -13px
      &::before
        border-color: transparent transparent #bbb
        top: -14px
      li
        padding: 5px 16px
        font-size: 14px
        width: 100%
        &:hover
          background-color: #eee
        a:hover
          text-decoration: inherit

</style>
