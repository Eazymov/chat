<template lang="html">
  <section id="sidebar">
    <md-list class="md-transparent md-dense">
      <md-list-item href="#/home">
        <md-icon>home</md-icon>
        <span>Profile</span>
      </md-list-item>
      <md-list-item href="#/messages">
        <md-icon>forum</md-icon>
        <span>Messages</span>
      </md-list-item>
      <md-list-item href="#/friends">
        <md-icon>person</md-icon>
        <span>Friends</span>
      </md-list-item>
      <md-list-item href="#/people">
        <md-icon>group</md-icon>
        <span>People</span>
      </md-list-item>
    </md-list>
  </section>
</template>

<script>
  export default {

  }
</script>

<style lang="sass">
  #sidebar
    height: calc(94vh - 48px)
    left: calc(50% - 575px)
    background-color: #eee
    position: fixed
    flex-shrink: 0
    flex-grow: 0
    width: 150px
    z-index: 5
    top: 63px

    .md-list-item

      .md-icon
        margin-right: 16px
</style>
