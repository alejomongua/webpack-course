import React from 'react'
import image from '../img/sableLuminoso.png'
import MarkdownData from '../../data/post.md'
import '../css/About.sass'

const About = () => (
  <div>
    <h1>About</h1>
    <div className='profile'>
      <img src={image} />
      <h1>{MarkdownData.title}</h1>
      <h2>{MarkdownData.author}</h2>
      <div className="content" dangerouslySetInnerHTML={{
        __html: MarkdownData.__content
      }}></div>
    </div>
  </div>
)

export default About