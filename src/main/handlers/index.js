function handleError(err) {
  const errText = err.message || err.errmsg;

  console.error(errText);
}

export {
  handleError
}
