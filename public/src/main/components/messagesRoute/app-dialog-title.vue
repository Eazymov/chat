<template lang="html">
  <div class="dialog-title">
    <div class="dialog-title__inner" v-if="user">
      <span class="dialog-title__username">{{ `${user.firstname} ${user.lastname}` }}</span>
      <div class="dialog-title__avatar" :style="avatar"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
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
  .dialog-title
    border-bottom: 1px solid #ddd
    background-color: #fff
    align-self: flex-start
    flex-shrink: 0
    height: 48px
    width: 100%
    flex-grow: 0
    &__inner
      flex-direction: column
      flex-wrap: wrap
      padding: 0 25px
      display: flex
      height: 100%
    &__username
      line-height: 47px
      font-size: 16px
      font-weight: 500
      align-self: flex-start
    &__avatar
      background-size: cover
      background-repeat: no-repeat
      align-self: flex-end
      margin: 7px 0 6px
      height: 34px
      width: 34px
      border-radius: 50%

</style>
