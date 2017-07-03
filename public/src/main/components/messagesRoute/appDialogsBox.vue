<template lang="pug">
  section(class='dialogs-box')
    md-input-container(class='dialogs-search')
      md-icon search
      md-input(v-model='search' placeholder='Search')

    md-list(class='dialogs-list md-double-line')
      App-dialog-contact(v-for="(dialog, index) in filteredDialogs"
                         :key="index"
                         :dialog="dialog"
                         :active="dialogID === dialog._id")
</template>

<script>
  import AppDialogContact from './appDialogContact.vue'

  export default {
    props: ['dialogID'],

    components: {
      AppDialogContact
    },

    data: () => ({
      search: ''
    }),

    computed: {
      dialogs () {
        return this.$store.state.dialogs;
      },

      filteredDialogs () {
        const dialogs = this.dialogs;
        const search = this.search.toLowerCase();

        return dialogs.filter(({ firstname, lastname }) => {
          const fullName = `${firstname} ${lastname}`.toLowerCase();

          return fullName.includes(search);
        })
      }
    }
  }
</script>

<style lang="sass">
  .dialogs-box
    border-right: 1px solid #ddd
    padding-top: 48px
    overflow-y: auto
    min-height: 100%
    width: 320px

    .dialogs-search
      background-color: #fff
      position: absolute
      padding: 8px 15px
      width: 319px
      z-index: 3
      margin: 0
      left: 0
      top: 0

    .dialogs-list
      position: relative
      overflow-y: auto
      max-height: 100%
      padding: 0
      z-index: 1
</style>
