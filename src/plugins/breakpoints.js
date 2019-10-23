import Vue from 'vue'

const screens = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

const xs = val => val < screens.sm
const sm = val => val >= screens.sm && val < screens.md
const md = val => val >= screens.md && val < screens.lg
const lg = val => val >= screens.lg && val < screens.xl
const xl = val => val >= screens.xl && val < screens.xxl
const xxl = val => val > screens.xl

const xsAndUp = val => val >= screens.xs
const smAndUp = val => val >= screens.sm
const mdAndUp = val => val >= screens.md
const lgAndUp = val => val >= screens.lg

const getBreakpoint = w => {
  if (xs(w)) return 'xs'
  else if (sm(w)) return 'sm'
  else if (md(w)) return 'md'
  else if (lg(w)) return 'lg'
  else if (xl(w)) return 'xl'
  else if (xxl(w)) return 'xxl'
  else return 'all'
}


const debounce = function(func, wait) {
  var timeout
  return () => {
    const later = function() {
      timeout = null
    }
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func()
  }
}

const breakpoints = Vue.observable({
  w: window.innerWidth,
  h: window.innerHeight,
  is: getBreakpoint(window.innerWidth),
  xsAndUp: xsAndUp(window.innerWidth),
  smAndUp: smAndUp(window.innerWidth),
  mdAndUp: mdAndUp(window.innerWidth),
  lgAndUp: lgAndUp(window.innerWidth)
})

window.addEventListener(
  'resize',
  debounce(() => {
    breakpoints.w = window.innerWidth
    breakpoints.h = window.innerHeight
    breakpoints.is = getBreakpoint(window.innerWidth),
    breakpoints.xsAndUp = xsAndUp(window.innerWidth),
    breakpoints.smAndUp = smAndUp(window.innerWidth),
    breakpoints.mdAndUp = mdAndUp(window.innerWidth),
    breakpoints.lgAndUp = lgAndUp(window.innerWidth)
  }, 200),
  false
)

export default breakpoints