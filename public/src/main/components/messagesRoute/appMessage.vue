<template lang="pug">
  div.message
    div.message__avatar(:style="avatar")
    div.message__info
      span.message__date {{ formatDate(message.date) }}
      router-link.message__sender.md-primary(to="/") {{ user.firstname }}
      p.message__content {{ message.content }}
    span(class="del-btn material-icons"
         @click="deleteMessage($event.target, message._id)") close
</template>

<script>
  import Axios from 'axios';

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
      },

      deleteMessage (target, id) {
        Axios
          .post('/deleteMessage', { id })
          .then(() => {
            target.parentElement.remove()
          })
          .catch(err => console.error(err.message));
      }
    }
  }
</script>

<style lang="sass">
  .message
    padding: 5px 35px 2px
    flex-direction: row
    position: relative
    margin-bottom: 0
    cursor: pointer
    flex-shrink: 0
    display: flex
    width: 100%
    &:hover
      background-color: #f5f5f5
      .del-btn
        opacity: .6

    &__avatar
      background-repeat: no-repeat
      margin: 2px 15px 13px 0
      background-size: cover
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
    .del-btn
      color: rgba(#000, .54)
      position: absolute
      font-weight: 800
      font-size: 16px
      transition: .1s
      right: 11px
      opacity: 0
      top: 20px
      &:hover
        opacity: 1
</style>
