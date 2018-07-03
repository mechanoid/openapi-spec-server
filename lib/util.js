const fs = require('fs')

const pathExistsAndIsDir = path => {
  if (fs.fileExistsSync(path)) {
    const stats = fs.stat(path)

    return !!stats.isDirectory()
  }

  return false
}

module.exports = { pathExistsAndIsDir }
