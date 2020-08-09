import React from 'react'
import PropTypes from 'prop-types'
import '../css/About.sass'

const About = props => {
  const siteConfig = require(`../../data/${props.site}/siteConfig`)
  const image = require(`../img/${siteConfig.profileImage}`)
  const MarkdownData = require(`../../data/${props.site}/bio.md`)

  import (`../css/${props.site}/theme.css`)

  return (
    <div>
      <h1>About</h1>
      <div className='profile'>
        <img src={image} />
        <h1>{MarkdownData.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{
          __html: MarkdownData.__content
        }}></div>
      </div>
    </div>
  )
}

About.propTypes = {
  site: PropTypes.string.isRequired
}

export default About