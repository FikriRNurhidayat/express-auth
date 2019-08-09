module.exports = {
  successResponse(data) {
    return {
      success: true,
      data: data
    }
  },

  errorsResponse(err) {
    return {
      success: false,
      errors: err
    }
  }
}
