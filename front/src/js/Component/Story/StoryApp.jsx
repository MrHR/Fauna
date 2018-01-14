import React, { Component } from 'react'
import { css } from 'glamor'

import { Router, Route } from 'react-router'

import InitStory from './Create/InitStory'
import CreateStory from './Create/CreateStory'
import Introduction from './Introduction'
import Banner from './Banner'

const Container = css({
});

const StoryCreaterContainer = css({
  width:  '100%',
  boxSizing: 'border-box'
});

class StoryApp extends Component {
  render() {
    return (
      <div {...Container}>
        <Banner />
        <div {...StoryCreaterContainer}>
          <Route path={'/'} exact component={InitStory} />
          <Route path={'/Create'} exact component={CreateStory} />
        </div>
      </div>
    )
  }
}

export default StoryApp