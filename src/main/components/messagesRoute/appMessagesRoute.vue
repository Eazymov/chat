<template lang="pug">
  section(id="view")
    md-card(id="messages")
      App-dialogs-box(:dialogID="dialogID")

      section(class="conversation-box")
        App-conversation(v-if="dialogID")

        div(class="unselected-dialog" v-else)
          p Please select a dialog or
            br
            router-link(to="/") create a new one
</template>

<script>
  import AppDialogsBox from './appDialogsBox.vue'
  import AppConversation from './appConversation.vue'

  export default {
    components: {
      AppDialogsBox,
      AppConversation
    },

    computed: {
      dialogID () {
        return this.$store.state.currentDialogID;
      }
    },

    created () {
      this.$store.dispatch('getFriends');
    }
  }
</script>

<style lang="sass">
  #messages
    height: calc(94vh - 48px)
    flex-direction: row
    min-height: 400px
    display: flex
    width: 970px

    .conversation-box
      justify-content: center
      align-items: center
      display: flex
      width: 650px

      .unselected-dialog
        background-image: url('../../../../public/files/icons/empty_dialog.png')
        background-repeat: no-repeat
        background-position: 55px 0
        color: rgba(#000, .54)
        text-align: center
        padding-top: 73px
        height: 113px

</style>
