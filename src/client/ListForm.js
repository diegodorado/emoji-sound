import React, { Component } from 'react'
const form_url = "https://docs.google.com/forms/d/e/1FAIpQLSd8nVJdNYf1JVmJmFSO9jOU7BEAGnEeUrSirw5k-UTPeJMw1w/viewform?entry.1972974114="

export default class List extends Component {
  render() {
    return (
      <table className="table table-bordered">
        <tbody>
          {
            this.props.emojis.map((emoji)=> {
                if(emoji[0].length==0)
                  return(<tr key={emoji[0]+emoji[1]}></tr>)
                return(
                  <tr key={emoji[0]+emoji[1]}>
                    <td className="group">
                    <a target="_blank" href={form_url+emoji[1]}>{emoji[1]}</a>
                    </td>
                    <td className="emoji">{
                      emoji[0].map((g)=> {
                          return(
                            <a key={g+g} target="_blank" href={form_url+g}>{g}</a>
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
