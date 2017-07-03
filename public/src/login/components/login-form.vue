<template lang="html">
  <form class="login-form" @submit.prevent="login">
    <md-card>
      <md-card-header>
        <span class="md-title">Login in your account</span>
      </md-card-header>
      <md-card-content>
        <md-input-container :class="{ 'md-input-invalid': !usernameIsValid }"
                            md-clearable>
          <label>Username</label>
          <md-input v-model="username"
                    required
                    @input.native.once="usernameFocused = true" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !passwordIsValid }"
                            md-clearable>
          <label>Password</label>
          <md-input v-model="password"
                    required
                    @input.native.once="passwordFocused = true"
                    type="password" />
        </md-input-container>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary"
                   type="submit"
                   :disabled="!formIsValid">Log in</md-button>
        <md-button class="forgot-password">Forgot your password?</md-button>
      </md-card-actions>
    </md-card>
    <md-spinner class="loader" :class="{ 'active': loading }" md-indeterminate />
    <span class="md-subheading error">{{ errText }}</span>
  </form>
</template>

<script>
  export default {
    data: () => ({
      username: '',
      password: '',
      usernameFocused: false,
      passwordFocused: false,
      errText: '',
      loading: false
    }),

    computed: {
      usernameIsValid () {
        if (!this.usernameFocused)
          return true;

        const username = this.username.trim();

        return username.length >= 4;
      },

      passwordIsValid () {
        if (!this.passwordFocused)
          return true;

        const password = this.password.trim();

        return password.length >= 8;
      },

      formIsValid () {
        return this.usernameIsValid && this.passwordIsValid;
      }
    },

    methods: {
      login () {
        const username = this.username
        const password = this.password
        const cfg = {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }

        this.sendData('/login', cfg)
      },

      sendData (url, cfg) {
        this.loading = true;
        this.errText = '';

        fetch(url, cfg)
          .then(res => res.json())
          .then(this.handleResponse)
          .catch(this.handleError);
      },

      handleResponse (response) {
        const { success, err } = response;

        this.loading = false;

        if (err)
          throw err

        if (success)
          window.location = '/chat'
      },

      handleError (err) {
        const errText = err.message || err.errmsg;

        this.loading = false;

        this.errText = errText

        console.error(errText)
      }
    }
  }
</script>

<style lang="sass">
  .login-form
    width: 296px
    margin: 10vh auto

    .forgot-password
      color: rgba(#000, .54)
      font-size: 12px

    .loader
      margin: 10px auto
      display: none
      &.active
        display: block
        & ~ .error
          display: none

    .error
      color: #f44336
      margin-top: 7px
      display: block
      text-align: center
</style>
