import React from "react"
import "../css/Article.sass"
import NotFound from "./NotFound"
import { connect } from 'react-redux'
import { fetchArticle } from '../actions'

class Article extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props) {
    props.dispatch(fetchArticle(props.site, props.match.params.slug))
  }

  render () {
    require(`../css/${this.props.site}/theme.css`)
    try {
      const billboardStyle = {
        backgroundImage: `url:(${this.props.posterImage})`
      }
      return (
        <div>
          <div className="Article">
            <div className="billboard" style={billboardStyle} />
            <h1>{this.props.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: this.props.__content }}
            />
          </div>
        </div>
      )
    } catch (err) {
      return <NotFound />
    }
  }
}

export default connect(state => ({
  ...state.content
}))(Article)