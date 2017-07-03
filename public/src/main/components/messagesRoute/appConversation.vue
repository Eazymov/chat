<template lang="pug">
  section(class="conversation")
    App-dialog-title(:user="users[dialogID]")

    div(class="messages-list")
      md-spinner(v-if="loading"
                 md-indeterminate
                 class="loader")
      transition-group(v-else name="msgs")
        App-message(class="message"
                    v-for="(message, index) in messages"
                    :message="message"
                    :user="users[message.sender_id]"
                    :key="index")

    App-message-editor(:sender_id="senderID" :recipient_id="dialogID")
  </section>
</template>

<script>
  import AppDialogTitle from './app-dialog-title.vue'
  import AppMessage from './appMessage.vue'
  import AppMessageEditor from './app-message-editor.vue'

  import Axios from 'axios'
  import { handleError } from '../../handlers'

  export default {
    components: {
      AppDialogTitle,
      AppMessage,
      AppMessageEditor
    },

    data: () => ({
      messages: [],
      users: {},
      loading: true
    }),

    computed: {
      Socket () {
        return this.$store.state.Socket
      },

      senderID () {
        return this.$store.state.currentUser['_id'];
      },

      dialogID () {
        return this.$store.state.currentDialogID;
      }
    },

    methods: {
      getDialog () {
        const data = {
          sender_id: this.senderID,
          recipient_id: this.dialogID
        }

        Axios
          .post('/getConversation', data)
          .then(({ data }) => {
            this.loading = false;

            const { err, users, messages } = data;

            if (err)
              throw err;

            this.users = users;
            this.messages = messages;
          })
          .catch(handleError)
      }
    },

    created () {
      this.Socket.onmessage = ({ data }) => {
        const { message } = JSON.parse(data);

        this.messages.unshift(message)
      },

      this.getDialog()
    },

    watch: {
      dialogID () {
        this.loading = true;
        this.messages = [];
        this.users = {};
        this.getDialog()
      }
    }
  }
</script>

<style lang="sass">
  .conversation
    flex-direction: column
    overflow-y: auto
    display: flex
    height: 100%
    width: 100%

    .messages-list
      flex-direction: column-reverse
      position: relative
      overflow-y: auto
      display: flex
      flex-grow: 1
      width: 100%

      .loader
        top: calc(50% - 25px)
        align-self: center
        position: absolute
        display: block

  .msgs-enter-active
    transition: .3s ease-out
    position: absolute

  .msgs-leave-active
    transition: .3s ease-in

  .msgs-leave, .msgs-enter-to
    transform: translateY(0)
    opacity: 1

  .msgs-enter, .msgs-leave-to
    transform: translateY(10px)
    opacity: 0
</style>
