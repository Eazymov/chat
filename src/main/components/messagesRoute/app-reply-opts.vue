<template lang="html">
  <div class="reply-opts">
    <h3>Shortcuts</h3>

    <label @click="$emit('input', true)" :class="{ 'active': value }">
      <i></i>
      <p>
        <b>Enter</b> — send message
        <br />
        <b>Ctrl+Enter</b> — new line
      </p>
    </label>

    <label @click="$emit('input', false)" :class="{ 'active' : !value }">
      <i></i>
      <p>
        <b>Ctrl+Enter</b> — send message
        <br />
        <b>Enter</b> — new line
      </p>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="sass">
  .reply-opts
    transition-timing-function: linear, step-end
    transition-duration: .2s
    border: 1px solid #bbb
    transition-delay: .5s
    border-radius: 2px
    visibility: hidden
    padding: 7px 13px
    text-align: left
    background: #fff
    opacity: 0
    &::after,
    &::before
      border: solid transparent
      position: absolute
      content: ''
      left: 195px
      height: 0
      top: 100%
      width: 0
    &::after
      border-top-color: #fff
      border-width: 6px
      margin-left: 1px
    &::before
      border-top-color: #777
      border-width: 7px
    &:hover
      visibility: visible
      opacity: 1
    h3
      font-weight: 500
    label
      margin-top: 10px
      font-size: 13px
      transition: .1s
      cursor: pointer
      display: block
      width: 200px
      color: #222
      &:hover i
        background: #eee
      &.active i
        border-color: #2196F3
        &::before
          position: absolute
          border-radius: 50%
          background: #2196F3
          height: 6px
          content: ''
          width: 6px
          left: 4px
          top: 4px
      i
        border: 1px solid #999
        display: inline-block
        margin: 0 3px 14px 0
        position: relative
        border-radius: 50%
        height: 16px
        width: 16px
      p
        display: inline-block
        width: 176px
        b
          display: inline-block
          margin-bottom: 3px
          font-weight: 500
</style>
