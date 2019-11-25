import React, { Component } from 'react'
import { withGlobalState } from 'react-globally'
import {  Link} from "react-router-dom";

const IntroEmoji = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">Live Emojing Sounds</h1>
      <br/><br/>
      <p>Help me 😐 👉 🔊</p>
      <p>💓 to livecode with 👻👽👾💩, 😥 need 🔊💾 that 💥 and 💎.</p>
      <p>👪 them as <a href="https://unicode.org/emoji/charts/emoji-ordering.html">🌐</a> (version 9️⃣ , ✂️ names)</p>
      <p> 🙏, 💓 your help 👉 🔍 💥 and 💎 🔊💾.</p>
    </div>
    <p>🖱 👉 🚀 🔊 💾</p>
    <p>(don&#39;t get it? change language)</p>
    <Link to="/list">Full List</Link>
  </div>
)

const IntroEn = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">Live Emojing Sounds</h1>
      <br/><br/>
      <p>Help me to map emojis to audio samples</p>
      <p>I love to livecode with emojis, but I need sample files that blows and shines.</p>
      <p>I have grouped them them as <a href="https://unicode.org/emoji/charts/emoji-ordering.html">unicode.org</a> does, although only supporting version 9.0 and with shorter names</p>
      <p>I would love your help to find those uniques audio files that corresponds to emojis (or emoji groups).</p>
    </div>
    <p>🖱 👉 🚀 🔊 💾</p>
    <Link to="/list">Full List</Link>

  </div>
)

const IntroEs = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">Live Emojing Sounds</h1>
      <br/><br/>
      <p>Ayudame a mapear emojis a samples de audio</p>
      <p>Me encanta livecodear con emojis, pero necesito sonidos copados que te vuelen la peluca.</p>
      <p>Los agrupe según <a href="https://unicode.org/emoji/charts/emoji-ordering.html">unicode.org</a> en su verión 9.0 y con nombres mas cortos</p>
      <p>Me encantaría tu ayuda para encontrar esos samples de audio únicos que se correspondan con emojis ( o grupos de emojis)</p>
    </div>
    <p>🖱 👉 🚀 🔊 💾</p>
    <Link to="/list">Full List</Link>
  </div>
)



class Intro extends React.Component  {
  render () {
    if(this.props.globalState.lang=='emoji'){
      return IntroEmoji()
    }
    if(this.props.globalState.lang=='en'){
      return IntroEn()
    }
    if(this.props.globalState.lang=='es'){
      return IntroEs()
    }
  }
}

export default withGlobalState(Intro)
