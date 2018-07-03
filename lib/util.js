const fs = require('fs')

const pathExistsAndIsDir = path => {
  if (fs.existsSync(path)) {
    const stats = fs.statSync(path)

    return !!stats.isDirectory()
  }

  return false
}

module.exports = { pathExistsAndIsDir }
