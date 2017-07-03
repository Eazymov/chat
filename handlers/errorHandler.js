module.exports = fn => {
  return (req, res, next) => {
    return fn(req, res, next)
      .catch(error => {
        console.error(error);
        
        const err = { message: error.message };

        res.send({ err })
      })
  }
}
