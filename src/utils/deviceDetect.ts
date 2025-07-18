export const isMobile = () => {
  if (typeof window === 'undefined') return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}

export const isIOS = () => {
  if (typeof window === 'undefined') return false

  return /iPad|iPhone|iPod/.test(window.navigator.userAgent)
}

export const isPortrait = () => {
  if (typeof window === 'undefined') return true

  return window.innerHeight > window.innerWidth
}

export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop'

  const ua = window.navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

export const getScreenSize = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export const getDevicePixelRatio = () => {
  if (typeof window === 'undefined') return 1

  return window.devicePixelRatio || 1
}

export const supportsTouchEvents = () => {
  if (typeof window === 'undefined') return false

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const supportsWebGL = () => {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

export const getDeviceCapabilities = () => {
  return {
    isMobile: isMobile(),
    isIOS: isIOS(),
    isPortrait: isPortrait(),
    deviceType: getDeviceType(),
    screenSize: getScreenSize(),
    pixelRatio: getDevicePixelRatio(),
    supportsTouchEvents: supportsTouchEvents(),
    supportsWebGL: supportsWebGL()
  }
} 