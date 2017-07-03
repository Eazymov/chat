<template lang="html">
  <form class="message-form">
    <button type="button" class="attach-btn">
      <md-icon>attach_file</md-icon>
    </button>

    <div ref="msgInput"
         autocorrect="off"
         autocapitalize="off"
         contentEditable="true"
         class="message-textfield"
         @input="handleInput"
         @keypress.enter="handleEnter"
         @keypress.ctrl="handleCtrlEnter"></div>
    <span class="placeholder" v-show="!messageExists">Write a message...</span>

    <button type="button"
            class="send-btn"
            @click.self="sendMessage"
            :class="{ 'active': messageExists }">
      <md-icon>send</md-icon>

      <App-reply-opts v-model="sendWithEnter"
                      :value="sendWithEnter" />
    </button>
  </form>
</template>

<script>
  import Axios from 'axios'
  import AppReplyOpts from './app-reply-opts.vue'
  import { handleError } from '../../handlers'

  export default {
    components: {
      AppReplyOpts
    },

    props: {
      sender_id: {
        type: String,
        required: true
      },
      recipient_id: {
        type: String,
        required: true
      }
    },

    data: () => ({
      messageExists: false,
      sendWithEnter: true
    }),

    computed: {
      msgInput () {
        return this.$refs.msgInput
      }
    },

    methods: {
      handleInput (event) {
        this.messageExists = event.target.innerText
      },

      handleEnter (event) {
        const { sendWithEnter, msgInput, sendMessage } = this;

        if (sendWithEnter) {
          event.preventDefault()
          sendMessage()
        } else if (!msgInput.innerText.trim()) {
          event.preventDefault()
        }
      },

      handleCtrlEnter ({ code }) {
        if (code !== 'Enter') return;

        const { sendWithEnter, msgInput, sendMessage } = this;

        if (sendWithEnter && msgInput.innerText.trim()) {
          document.execCommand('insertParagraph')
        } else {
          sendMessage()
        }
      },

      sendMessage () {
        const { msgInput, sender_id, recipient_id } = this;
        const content = msgInput.textContent;
        const data = {
          sender_id,
          recipient_id,
          content
        }

        Axios
          .post('/message', data)
          .then(({ data }) => {
            const { err } = data;

            if (err)
              throw err

            msgInput.innerHTML = '';
          })
          .catch(handleError);
      }
    },

    mounted () {
      this.msgInput.focus();
    },

    watch: {
      recipient_id () {
        this.msgInput.innerHTML = '';
        this.msgInput.focus();
      }
    }
  }
</script>

<style lang="sass">
  .message-form
    border-top: 1px solid #ddd
    align-self: flex-end
    position: relative
    flex-shrink: 0
    flex-grow: 0
    display: flex
    width: 100%

    .attach-btn
      background-color: transparent
      color: rgba(#000, .54)
      align-self: flex-end
      cursor: pointer
      border: none
      height: 60px
      width: 60px
      &:hover
        color: rgba(#000, .87)
      .md-icon
        transition: .2s

    .message-textfield
      border: 1px solid #ccc
      color: rgba(#000, .87)
      padding: 8px 11px 9px
      border-radius: 2px
      font-style: normal
      max-height: 200px
      overflow-y: auto
      font-weight: 400
      font-size: 14px
      margin: 10px 0
      flex: 1
      & + .placeholder
        color: rgba(#000, .65)
        pointer-events: none
        position: absolute
        font-size: 14px
        top: 19px
        left: 72px
      &:focus + .placeholder
        color: rgba(#000, .45)

    .send-btn
      background-color: transparent
      align-self: flex-end
      position: relative
      cursor: pointer
      border: none
      height: 60px
      width: 60px
      &:hover
        .md-icon
          color: #2196F3
        .reply-opts
          visibility: visible
          opacity: 1

      &.active .md-icon
        color: #2196F3
      .md-icon
        color: rgba(#000, .54)
        transition: .2s

      .reply-opts
        position: absolute
        bottom: 54px
        right: 8px
        z-index: 2
</style>
