exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[reqPart])

    if (error) return res.status(error.status || 400).send(error)

    next()
  }
}
