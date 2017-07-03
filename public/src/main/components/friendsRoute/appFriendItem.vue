<template lang="pug">
  md-list-item.friend.md-triple-line
    div.friend__avatar.md-large(:style="avatar")

    div.md-list-text-container
      router-link(to="/") {{ `${friend.firstname} ${friend.lastname}` }}
      span Yekaterinburg
      span Mobile

    md-button(class="md-icon-button md-list-action"
              @click.native="deleteFriend(friend._id)")
      md-icon close
</template>

<script>
  export default {
    props: {
      friend: {
        type: Object,
        required: true
      }
    },

    computed: {
      avatar () {
        const url = `url('../../../../public/uploads/${this.friend.avatar}')`;

        return {
          'background-image': url
        }
      }
    },

    methods: {
      deleteFriend (id) {
        this.$store.dispatch('deleteFriend', id);
      }
    }
  }
</script>

<style lang="sass">
  .friend
    padding: 10px 0 15px
    border-bottom: 1px solid #ddd
    transition: .1s
    width: 800px
    &:hover
      background-color: #f5f5f5
    &__avatar
      background-repeat: no-repeat
      background-size: cover
      border-radius: 50%
      height: 70px
      margin: 10px 15px 10px 0
      width: 70px
</style>
