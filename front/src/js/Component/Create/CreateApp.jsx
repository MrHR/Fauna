import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router'

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
    console.log(this.props.match)
    return (
      <div {...Container}>
        <div {...StoryCreaterContainer} className="page">
          <InitStory />
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      story: state.story,
      encounter: state.encounter
    }
  },
  dispatch => {
    return {}
  }
)(CreateApp)
