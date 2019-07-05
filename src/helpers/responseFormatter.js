module.exports = {
  successResponse(data) {
    return {
      status: 'OK',
      result: data
    }
  },

  errorsResponse(err) {
    return {
      status: 'Failed',
      errors: err
    }
  }
}
