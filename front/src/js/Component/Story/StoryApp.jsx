import React, { Component } from 'react'
import { css } from 'glamor'
import { Router, Route } from 'react-router'

import Introduction from './Introduction'
import CreateEncounter from './Create/CreateEncounter'

const StoryCreaterContainer = css({
  width:  '100%',
  height: '500px',
  backgroundColor: '#eee'
})

class StoryApp extends Component {
  render() {
    return (
      <div>
        <Introduction />
        <div {...StoryCreaterContainer}>
          <Route path={'/'} exact component={CreateEncounter} />
        </div>
      </div>
    )
  }
}

export default StoryApp