import React from 'react'
import AnimateOnScroll from './AnimateOnScroll'

const Fallback = (props) => {
  // Minimal fallback with spinner & fade-up animation
  return (
    <AnimateOnScroll className="fade-up fade-in" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div aria-busy="true" aria-label="Loading content" className="spinner"></div>
      <p style={{ marginTop: '20px' }}>Loading, please wait...</p>
    </AnimateOnScroll>
  )
}

export default Fallback
