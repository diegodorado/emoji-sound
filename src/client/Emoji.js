import React, { Component } from 'react'
import {  Link } from "react-router-dom"
const emojiUnicode = require("emoji-unicode")


export default class Emoji extends Component {
  render() {
    const emoji = this.props.emojis.filter(e => emojiUnicode(e) == this.props.match.params.id)[0]
    const group = this.props.groups.filter(g => g[0].includes(emoji))[0][1]
    const index = this.props.emojis.indexOf(emoji)
    const nextEmoji = this.props.emojis[(index+1)%this.props.emojis.length]
    const previousEmoji = this.props.emojis[(index+this.props.emojis.length-1)%this.props.emojis.length]
    return (
      <div className="emoji-page">
        <div className="big-emoji">{emoji}</div>
        <h3>{group}</h3>

        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item"><Link className="page-link" to={"/emoji/"+emojiUnicode(previousEmoji)}>{previousEmoji} ⬅️</Link></li>
            <li className="page-item"><Link className="page-link" to="/list/">Full List</Link></li>
            <li className="page-item"><Link className="page-link" to={"/emoji/"+emojiUnicode(nextEmoji)}>➡️ {nextEmoji}</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
