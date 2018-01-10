import React, { Component } from 'react'
import { css } from 'glamor'

import { Router, Route } from 'react-router'

import InitStory from './Create/InitStory'
import Introduction from './Introduction'
import Banner from './Banner'

const Container = css({
});

const StoryCreaterContainer = css({
  width:  '100%',
  backgroundColor: '#eee',
  boxSizing: 'border-box'
});

class StoryApp extends Component {
  render() {
    return (
      <div {...Container}>
        <Banner />
        <div {...StoryCreaterContainer}>
          <Route path={'/'} exact component={InitStory} />
        </div>
      </div>
    )
  }
}

export default StoryApp