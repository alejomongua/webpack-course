import React from "react"
import '../content.css'
import MarkdownData from '../../data/post.md'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="profile">
        <img src={require("../img/sableLuminoso.png")} />
        <h1>{MarkdownData.title}</h1>
        <h2>{MarkdownData.author}</h2>
        <div className="content" dangerouslySetInnerHTML={{
          __html: MarkdownData.__content
        }}></div>
      </div>
    )
  }
}