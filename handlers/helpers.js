const emailRegex =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function checkPassword (password) {
  if (!password)
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

function getFormattedDate () {
  const date = new Date();

  const D = to2(date.getDate());
  const M = to2(date.getMonth() + 1);
  const Y = date.getFullYear();

  return `${D}-${M}-${Y}`;
}

function getFormattedTime () {
  const date = new Date();

  const S = to2(date.getSeconds());
  const M = to2(date.getMinutes());
  const H = to2(date.getHours());

  return `${H}:${M}:${S}`;
}

function to2 (number) {
  return number < 10 ? `0${number}` : number;
}

exports.getFormattedDate = getFormattedDate
exports.getFormattedTime = getFormattedTime
exports.getFullDate = () => `${getFormattedDate()} ${getFormattedTime()}`;

exports.checkUserData = User => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    repeatPassword,
    gender
  } = User;
  const test = checkPassword(password);

  let comment = '';
  let result = false;

  if (!firstname) {
    comment = 'Please, enter first name'
  } else if (firstname.length < 2) {
    comment = 'First name is not valid'
  } else if (!lastname) {
    comment = 'Please, enter last name'
  } else if (lastname.length < 2) {
    comment = 'Last name is not valid'
  } else if (!username) {
    comment = 'Please, enter username'
  } else if (username.length < 4) {
    comment = 'Username is not valid'
  } else if (!email) {
    comment = 'Please, enter email'
  } else if (!emailRegex.test(email)) {
    comment = 'Email is not valid'
  } else if (!test.result) {
    comment = test.comment
  } else if (!gender) {
    comment = 'Please, choose your gender'
  } else {
    result = true;
  }

  return { result, comment }
}
