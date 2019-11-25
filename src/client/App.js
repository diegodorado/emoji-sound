import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-globally'
import {groups, emojis} from './emojis'
import Header from './Header'
import Intro from './Intro'
import List from './List'
import Group from './Group'
import Emoji from './Emoji'

const initialState = {
  lang: 'emoji'
}

const App = () => (
  <Provider globalState={initialState}>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Intro} />
        <Route path="/list" render={(props) => <List {...props} groups={groups} />} />
        <Route path="/group/:id" render={(props) => <Group {...props} groups={groups} />} />
        <Route path="/emoji/:id" render={(props) => <Emoji {...props} groups={groups} emojis={emojis} />} />
      </div>
    </Router>
  </Provider>
);

export default App;
