<template lang="html">
  <section id="sidebar">
    <md-list class="md-transparent md-dense">
      <md-list-item>
        <md-icon>home</md-icon>
        <span>Profile</span>
      </md-list-item>
      <md-list-item>
        <md-icon>forum</md-icon>
        <span>Messages</span>
      </md-list-item>
      <md-list-item>
        <md-icon>group</md-icon>
        <span>Friends</span>
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
    background-color: transparent
    margin: 3vh 30px 3vh 0
    flex-shrink: 0
    flex-grow: 0
    width: 150px

    .md-list-item

      .md-icon
        margin-right: 16px
</style>
