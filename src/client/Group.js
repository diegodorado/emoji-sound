import React, { Component } from 'react'
import {  Link } from "react-router-dom"
const emojiUnicode = require("emoji-unicode")


export default class Group extends Component {
  render() {
    return (
      <div>
        <Link to="/list/">List</Link>
        <h2>{this.props.match.params.id}</h2>
          {
            this.props.groups.filter(g => g[1] == this.props.match.params.id)[0][0].map((e)=> {
              return(
                <Link key={e} to={"/emoji/"+emojiUnicode(e)}>{e}</Link>
              )
           })
         }
      </div>
    );
  }
}
