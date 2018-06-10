import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router'
import { withRouter } from 'react-router-dom'

import ListApp  from './List/ListApp'

const Container = css({
});

const StoryCreaterContainer = css({
  width:  '100%',
  boxSizing: 'border-box'
});

class ReadApp extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div {...Container}>
        <div {...StoryCreaterContainer}>
          <Route path={'/'} exact component={ListApp} />
          {/* <Route path={'/preview'} exact com */}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {
      story: state.story
    }
  },
  dispatch => {
    return {}
  }
)(ReadApp))
