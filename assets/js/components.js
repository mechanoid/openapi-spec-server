class FullHeightContainer extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    this.frame = this.querySelector('iframe')
    window.requestAnimationFrame(this.setHeight.bind(this))
  }

  disconnectedCallback () {
    this.cancelled = false
  }

  setHeight () {
    if (!this.cancelled) {
      const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      this.frame.style.height = `${height - 32}px`

      setTimeout(() => window.requestAnimationFrame(this.setHeight.bind(this)), this.delay)
    }
  }

  get delay () {
    return 100
  }
}

customElements.define('full-height-container', FullHeightContainer)

class SwaggerFrameCleaner extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    const frame = this.querySelector('iframe')
    frame.onload = () => {
      const document = frame.contentDocument ? frame.contentDocument : frame.contentWindow.document
      const topbar = document.querySelector('.topbar')
      topbar.remove()
    }
  }
}

customElements.define('swagger-frame-cleaner', SwaggerFrameCleaner)

class NavLink extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    this.link = this.querySelector('a') // first link
    this.parentLink = this.parentNode

    const currentAnchor = location.href.split('#')[1]

    // see if nav-link itself is the current anchor
    if (currentAnchor !== undefined && this.link.getAttribute('href') === `#${currentAnchor}`) {
      this.parentLink.classList.add('open')
    } else {
      // see if children nav-links have the current anchor
      if (currentAnchor !== undefined) {
        const childLinks = nodeList2Array(this.querySelectorAll('a'))
        const link = childLinks.find(curr => curr.getAttribute('href') === `#${currentAnchor}`)
        if (link !== undefined) {
          this.parentLink.classList.add('open')
        }
      }
    }

    this.link.addEventListener('click', e => {
      // e.preventDefault()
      if (this.parentLink.classList.contains('open')) {
        this.parentLink.classList.remove('open')
      } else {
        this.parentLink.classList.add('open')
      }
    })
  }
}

customElements.define('nav-link', NavLink)

class MainNavigation extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    this.specLinks = nodeList2Array(this.querySelectorAll('ul a')).filter(curr => {
      const href = curr.getAttribute('href')

      return href !== undefined && href !== '' && href.indexOf('#') !== 0
    })

    this.specLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()

        const href = link.getAttribute('href')
        // console.log(href)
        const anchor = location.href.split('#')[1]

        location.href = anchor !== undefined ? `${href}#${anchor}` : href
      })
    })
  }
}

customElements.define('main-navigation', MainNavigation)

function nodeList2Array (nl) {
  return Array.prototype.slice.call(nl)
}
