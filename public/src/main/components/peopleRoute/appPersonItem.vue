<template lang="pug">
  md-list-item.person.md-triple-line
    div.person__avatar.md-large(:style="avatar")

    div.md-list-text-container
      router-link(to="/") {{ `${person.firstname} ${person.lastname}` }}
      span Yekaterinburg
      span Mobile

    md-button(class="md-icon-button md-list-action"
              @click.native="addFriend(person._id)")
      md-icon add
</template>

<script>
  export default {
    props: {
      person: {
        type: Object,
        required: true
      }
    },

    computed: {
      avatar () {
        const url = `url('../../../../public/uploads/${this.person.avatar}')`;

        return {
          'background-image': url
        }
      }
    },

    methods: {
      addFriend (id) {
        this.$store.dispatch('addFriend', id);
      }
    }
  }
</script>

<style lang="sass">
  .person
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
