import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router'
import { withRouter } from 'react-router-dom';

import InitStory from './InitStory';

const Container = css({
})

const StoryCreaterContainer = css({
});

class CreateApp extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div {...Container}>
        <div {...StoryCreaterContainer} className="page">
          <InitStory />
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {
      story: state.story,
      encounter: state.encounter
    }
  },
  dispatch => {
    return {}
  }
)(CreateApp))
