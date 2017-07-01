<template lang="pug">
  md-list-item(class="dialog" :class="{ active }" @click.native="setDialog(dialog._id)")
    md-avatar(class="dialog__avatar" :style="avatar")

    div(class="md-list-text-container")
      span(class="dialog__name") {{ dialog.firstname }} {{ dialog.lastname }}

      p(class="dialog__last-msg")
        span(class="dialog__last-msg__from") You: {{ dialog.lastmessage }}
        span(class="dialog__last-msg__date")
          | {{ dialog.lastmessage_date }}yesterday

    md-divider
</template>

<script>
  export default {
    props: {
      dialog: {
        type: Object,
        required: true
      },

      active: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      avatar () {
        const url = `url(../../../public/uploads/${this.dialog.avatar})`;

        return {
          'background-image': url
        }
      }
    },

    methods: {
      setDialog (id) {
        this.$store.commit('setCurrentDialog', id)
      }
    }
  }
</script>

<style lang="sass">
  .dialog
    cursor: pointer
    transition: .2s
    color: #000
    &:hover
      background-color: #eee
    &.active
      background-color: #2196F3
      color: #fff

    &__avatar
      background-repeat: no-repeat
      background-size: cover
      height: 50px
      width: 50px

    &__name
      max-width: 205px
      display: block
      overflow: hidden
      text-overflow: ellipsis

    &__last-msg
      color: inherit !important
      opacity: .75
      &__from
        font-weight: 400
        font-size: 13px
        color: inherit
      &__date
        position: absolute
        font-weight: 400
        font-size: 13px
        color: inherit
        display: block
        right: 5px
        top: 1px
</style>
