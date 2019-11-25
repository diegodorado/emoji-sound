import React, { Component } from 'react'
import {  Link } from "react-router-dom"
const emojiUnicode = require("emoji-unicode")


export default class List extends Component {
  render() {
    return (
      <table className="table table-bordered">
        <tbody>
          {
            this.props.groups.map((g)=> {
                if(g[0].length==0)
                  return(<tr key={g[0]+g[1]}></tr>)
                return(
                  <tr key={g[0]+g[1]}>
                    <td className="group">
                      <Link to={"/group/"+g[1]}>{g[1]}</Link>
                    </td>
                    <td className="emoji">{
                      g[0].map((e)=> {
                          return(
                            <Link key={e} to={"/emoji/"+emojiUnicode(e)}>{e}</Link>
                            )
                       })
                    }</td>
                  </tr>
                  )
             })
          }
        </tbody>
      </table>
    );
  }
}
