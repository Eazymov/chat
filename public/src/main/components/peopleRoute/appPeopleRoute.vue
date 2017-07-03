<template lang="pug">
  section#view
    md-card.people-box
      md-list.people-list
        App-person-item(v-for="(person, index) in people"
                        :person="person"
                        :key="index")
</template>

<script>
  import AppPersonItem from './appPersonItem.vue';

  export default {
    components: {
      AppPersonItem
    },

    data: () => ({
      limit: 20
    }),

    asyncComputed: {
      people: {
        async get () {
          const limit = this.limit;

          const { data } = await this.post('/getPeople', { limit })

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
  .people-box
    margin-right: 100px
    .people-list
      padding: 0
      width: 800px
</style>
