const validate = (data) => {
  const requiredKeys = ['forename', 'surname', 'email']
  let errors = []
  requiredKeys.forEach((key) => {
    if (data[key] === undefined) {
      errors.push(`${key} is a required property`)
    }
  })

  if (data['email']) {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!emailRegex.test(data['email'])) {
      errors.push('email is invalid')
    }
  }

  return { isValid: errors.length === 0, errors }
}

module.exports = { validate }
