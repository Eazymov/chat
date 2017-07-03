<template lang="pug">
  section#view
    md-card.friends-box
      md-list.friends-list
        App-friend-item(v-for="(friend, index) in friends"
                        :friend="friend"
                        :key="index")
</template>

<script>
  import AppFriendItem from './appFriendItem.vue';

  export default {
    components: {
      AppFriendItem
    },

    data: () => ({
      limit: 20
    }),

    asyncComputed: {
      friends: {
        async get () {
          const body = {
            limit: this.limit,
            friendList: this.$store.state.currentUser.friends
          }

          const { data } = await this.post('/getFriends', body)

          return data;
        },

        default () {
          return [];
        }
      }
    }
  }
</script>

<style lang="sass">
  .friends-box
    margin-right: 100px
    .friends-list
      padding: 0
      width: 800px
</style>
