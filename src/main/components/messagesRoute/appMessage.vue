<template lang="pug">
  div(class="message")
    div(class="message__avatar" :style="avatar")
    div(class="message__info")
      span(class="message__date") {{ formatDate(message.date) }}
      router-link(to="/" class="message__sender md-primary") {{ user.firstname }}
      p(class="message__content") {{ message.content }}
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      },

      message: {
        type: Object,
        required: true
      }
    },

    computed: {
      avatar () {
        const url = `url(../../../../public/uploads/${this.user.avatar})`;

        return {
          'background-image': url
        }
      }
    },

    methods: {
      formatDate (date) {
        const day = (new Date()).getDate();
        const dateDay = +date.slice(0, 2)

        if (day > dateDay) {
          return date.slice(0, 5)
        } else {
          return date.slice(-8, -3)
        }
      }
    }
  }
</script>

<style lang="sass">
  .message
    flex-direction: row
    margin-bottom: 5px
    padding: 0 35px
    flex-shrink: 0
    display: flex
    width: 100%
    &__avatar
      background-repeat: no-repeat
      background-size: cover
      margin: 2px 15px 13px 0
      border-radius: 50%
      height: 34px
      width: 34px
    &__info

    &__date
      color: rgba(#000, .54)
      display: inline-block
      margin-right: 5px
      font-weight: 400
      font-size: 12px
    &__sender
      font-weight: 500
      font-size: 14px
    &__content
      color: rgba(#000, .87)
      word-wrap: break-word
      font-style: normal
      overflow: hidden
      font-weight: 400
      font-size: 14px
      display: block
      width: 510px
</style>
