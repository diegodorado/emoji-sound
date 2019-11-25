import React, { Component } from 'react'
import {  Link} from "react-router-dom";
import { withGlobalState } from 'react-globally'

class Header extends React.Component  {
  changeLanguage = (lang) => {
    this.props.setGlobalState({
      lang: lang
    })
  }
  render () {
    return (
      <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">

          <nav className="navbar">
            <a className="navbar-brand" href="/">😬 Live Emojing</a>
          </nav>

          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li className={(this.props.globalState.lang=='emoji')?"nav-item active":'nav-item'}>
              <a className="nav-link" onClick={(e)=>{e.preventDefault();this.changeLanguage('emoji')}} href="#">😐</a>
            </li>
            <li className={(this.props.globalState.lang=='en')?"nav-item active":'nav-item'}>
              <a className="nav-link" onClick={(e)=>{e.preventDefault();this.changeLanguage('en')}}  href="#">🇬🇧</a>
            </li>
            <li className={(this.props.globalState.lang=='es')?"nav-item active":'nav-item'}>
              <a className="nav-link" onClick={(e)=>{e.preventDefault();this.changeLanguage('es')}}  href="#">🇪🇸</a>
            </li>
          </ul>
      </header>
    )
  }
}

export default withGlobalState(Header)
