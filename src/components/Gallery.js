import React from 'react'

const getBundle = () => {
  import('lodash').then(_ => {
    console.log('imported', _)
  })
}

const Gallery = () => (
  <div>
    <h1 onClick={getBundle}>Gallery</h1>
  </div>
)

export default Gallery