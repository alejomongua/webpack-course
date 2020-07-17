import React from 'react'
import styles from './main.sass'
import { css } from 'emotion'
import styled from '@emotion/styled'

const Fancy = styled("h1")`
  color: ${props => props.wild ? 'hotpink' : 'gold'};
`
const red = "red"

const className = css`
  color: ${red};
  font-size: 5em;
`

export default class extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      count: 0
    }
  }

  render() {
    const isWild = this.state.count %2 === 0
    return (
      <div className={styles.counter} onClick={this.climb.bind(this)}>
        <Fancy wild={isWild}>Count: {this.state.count}</Fancy>
      </div>
    )
  }

  climb() {
    this.setState({
      count: this.state.count + 1
    })
  }
}