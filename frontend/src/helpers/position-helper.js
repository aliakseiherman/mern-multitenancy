function isSufficientSpaceAbove(parentRef, triggerRef, pxReservedAbove) {

  var parentPos = parentRef.current.getBoundingClientRect(),
    childPos = triggerRef.current.getBoundingClientRect(),
    height = parentPos.height,
    relativePos = {}

  relativePos.top = childPos.top - parentPos.top

  return relativePos.top > pxReservedAbove
}

function isLowerThanMiddle(parentRef, triggerRef) {

  var parentPos = parentRef.current.getBoundingClientRect(),
    triggerPos = triggerRef.current.getBoundingClientRect(),
    height = parentPos.height,
    relativePos = {}

  relativePos.top = triggerPos.top - parentPos.top

  return relativePos.top > height / 2
}

function isCloserToTheLeft(parentRef, triggerRef) {

  var parentPos = parentRef.current.getBoundingClientRect()
  var triggerPos = triggerRef.current.getBoundingClientRect()
  var width = parentPos.width
  var relativePos = {}

  relativePos.left = triggerPos.left - parentPos.left

  return relativePos.left < width / 2
}

function getOffset(triggerRef) {
  let offset = triggerRef.current.offsetHeight + 3
  return offset
}

export function getPopupStyle(parentRef, triggerRef, config) {

  let style = {
    display: 'flex'
  }

  if (config && config.anchor) {
    if (config.anchor.x === 'r') {
      style.right = 0
    }
    if (config.anchor.x === 'l') {
      style.left = 0
    }
  } else {
    if (isCloserToTheLeft(parentRef, triggerRef)) {
      style.left = 0
    } else {
      style.right = 0
    }
  }

  if (config && config.pxReservedAbove) {
    if (isSufficientSpaceAbove(parentRef, triggerRef, config.pxReservedAbove)) {
      style.bottom = getOffset(triggerRef)
    } else {
      style.top = getOffset(triggerRef)
    }
  } else {
    if (isLowerThanMiddle(parentRef, triggerRef)) {
      style.bottom = getOffset(triggerRef)
    } else {
      style.top = getOffset(triggerRef)
    }
  }

  return style
}

export const getWidth = (elementRef) => elementRef.current.getBoundingClientRect().width