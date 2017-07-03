<template lang="html">
  <form class="signup-form" @submit.prevent="signup">
    <md-card class="signup-form">
      <md-card-header>
        <span class="md-title">Create new account</span>
      </md-card-header>
      <md-card-content>
        <md-input-container :class="{ 'md-input-invalid': !firstnameIsValid }">
          <label>2+ letters</label>
          <md-input v-model="firstname"
                    required
                    placeholder="First name"
                    @input.native.once="firstnameFocused = true" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !lastnameIsValid }">
          <label>2+ letters</label>
          <md-input v-model="lastname"
                    required
                    placeholder="Last name"
                    @input.native.once="lastnameFocused = true" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !usernameIsValid }">
          <label>4+ symbols</label>
          <md-input v-model="username"
                    required
                    placeholder="Username"
                    @input.native.once="usernameFocused = true" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !emailIsValid }">
          <md-input v-model="email"
                    required
                    placeholder="Email"
                    @input.native.once="emailFocused = true"
                    type="email" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !passwordIsValid }">
          <label>8+ symbols (letters and numbers)</label>
          <md-input v-model="password"
                    required
                    placeholder="Password"
                    @input.native.once="passwordFocused = true"
                    type="password" />
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': !repeatPasswordIsValid }">
          <md-input v-model="repeatPassword"
                    required
                    :disabled="!passwordIsValid"
                    placeholder="Repeat password"
                    @input.native.once="repeatPasswordFocused = true"
                    type="password" />
        </md-input-container>
        <span class="md-body-1">Gender</span>
        <div>
          <md-radio v-model="gender" md-value="male">Male</md-radio>
          <md-radio v-model="gender" md-value="female">Female</md-radio>
        </div>
      </md-card-content>
      <md-card-actions>
        <span class="md-subheading error">{{ errText }}</span>
        <md-button class="md-raised md-primary" type="submit" :disabled="!submitIsActive">Sign up</md-button>
      </md-card-actions>
    </md-card>
    <md-spinner class="loader" v-show="loading" md-indeterminate />

    <md-dialog-alert
      md-content="You have registered successfully. Now you can enter your account with username and password"
      md-ok-text="OK"
      class="dialog"
      @close="goToLogin"
      ref="alert" />
  </form>
</template>

<script>
  const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function checkPassword (password) {
    if (password.length === 0)
      return {
        result: false,
        comment: 'Please, enter the password'
      }

    if (password.length < 8)
      return {
        result: false,
        comment: 'Password length should be greater than or equal to 8'
      }

    if (!/\d/.test(password))
      return {
        result: false,
        comment: 'Password should contain at least one number'
      }

    if (!/[a-zA-Z]/.test(password))
      return {
        result: false,
        comment: 'Password length contain at least one letter'
      }

    return {
      result: true,
      comment: ''
    }
  }

  export default {
    data: () => ({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      gender: '',
      firstnameFocused: false,
      lastnameFocused: false,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      repeatPasswordFocused: false,
      errText: '',
      loading: false
    }),

    computed: {
      firstnameIsValid () {
        if (!this.firstnameFocused)
          return true;

        const firstname = this.firstname.trim();
        const valid = firstname.length >= 2;

        if (firstname === '') {
          this.errText = 'Please, enter first name'
        } else if (!valid) {
          this.errText = 'First name is not valid'
        } else {
          this.errText = '';
        }

        return valid;
      },

      lastnameIsValid () {
        if (!this.lastnameFocused)
          return true;

        const lastname = this.lastname.trim();
        const valid = lastname.length >= 2;

        if (lastname === '') {
          this.errText = 'Please, enter last name'
        } else if (!valid) {
          this.errText = 'Last name is not valid'
        } else {
          this.errText = '';
        }

        return valid;
      },

      usernameIsValid () {
        if (!this.usernameFocused)
          return true;

        const username = this.username.trim();
        const valid = username.length >= 4;

        if (username === '') {
          this.errText = 'Please, enter username'
        } else if (!valid) {
          this.errText = 'Username is not valid'
        } else {
          this.errText = '';
        }

        return valid;
      },

      emailIsValid () {
        if (!this.emailFocused)
          return true;

        const email = this.email.trim();
        const valid = emailRegex.test(email);

        if (email === '') {
          this.errText = 'Please, enter email'
        } else if (!valid) {
          this.errText = 'Email is not valid'
        } else {
          this.errText = '';
        }

        return valid;
      },

      passwordIsValid () {
        if (!this.passwordFocused)
          return true;

        const password = this.password.trim();
        const test = checkPassword(password);

        this.errText = test.comment;

        return test.result;
      },

      repeatPasswordIsValid () {
        if (!this.repeatPasswordFocused)
          return true;

        const password = this.password.trim();
        const repeatPassword = this.repeatPassword.trim();
        const valid = (password === repeatPassword)

        if (!this.passwordIsValid) {
          this.errText = 'Please, enter your password'
        } else if (repeatPassword.length === 0) {
          this.errText = 'Please, repeat your password'
        } else if (!valid) {
          this.errText = 'Passwords don\'t match'
        } else {
          this.errText = '';
        }

        return valid;
      },

      submitIsActive () {
        const {
          firstname,
          firstnameIsValid,
          lastname,
          lastnameIsValid,
          username,
          usernameIsValid,
          email,
          emailIsValid,
          password,
          passwordIsValid,
          repeatPassword,
          repeatPasswordIsValid,
          gender
        } = this;

        return (!!firstname && firstnameIsValid &&
                !!lastname && lastnameIsValid &&
                !!username && usernameIsValid &&
                !!email && emailIsValid &&
                !!password && passwordIsValid &&
                !!repeatPassword && repeatPasswordIsValid &&
                !!gender);
      }
    },

    methods: {
      goToLogin () {
        location = '/login';
      },

      signup () {
        const {
          firstname,
          lastname,
          email,
          username,
          password,
          repeatPassword,
          gender
        } = this;

        const cfg = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            username,
            password,
            repeatPassword,
            gender
          })
        }

        this.sendData('/signup', cfg)
      },

      sendData (url, cfg) {
        this.loading = true;

        fetch(url, cfg)
          .then(res => res.json())
          .then(this.handleResponse)
          .catch(this.handleError);
      },

      handleResponse (response) {
        const { success, err } = response;

        this.loading = false;

        if (err)
          throw err;

        if (success) {
          this.$refs['alert'].open()
        }
      },

      handleError (err) {
        this.loading = false;

        this.errText = err.message
      }
    }
  }
</script>

<style lang="sass">
  .signup-form
    width: 400px
    margin: 15px auto

    .md-card-content
      padding-bottom: 0

      .md-input-container
        margin-bottom: 20px
        &:not(:nth-of-type(n + 5))
          display: block
          float: left
          width: 50%
        label
          pointer-events: none

    .loader
      display: block
      margin: 10px auto

    .error
      color: #f44336
      display: block
      margin-left: 10px
      width: 100%

  .dialog
    margin-bottom: 13vh

</style>
