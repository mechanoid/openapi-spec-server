const fs = require('fs')

const pathExistsAndIsDir = path => {
  if (fs.existsSync(path)) {
    const stats = fs.stat(path)

    return !!stats.isDirectory()
  }

  return false
}

module.exports = { pathExistsAndIsDir }
