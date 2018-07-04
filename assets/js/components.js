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
    this.link = this.querySelector('a')
    this.parentLink = this.parentNode

    this.link.addEventListener('click', e => {
      e.preventDefault()
      if (this.parentLink.classList.contains('open')) {
        this.parentLink.classList.remove('open')
      } else {
        this.parentLink.classList.add('open')
      }
    })
  }
}

customElements.define('nav-link', NavLink)
