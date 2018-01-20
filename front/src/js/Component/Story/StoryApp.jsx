import React, { Component } from 'react'
import { css } from 'glamor'

import { Router, Route } from 'react-router'

import InitStory from './Create/InitStory'
import CreateStory from './Create/CreateStory'
import Introduction from './Introduction'
import Banner from './Banner'
import AddEncounterAction from './Create/AddEncounterAction'
import NoMatch from '../General/NoMatch'

const Container = css({
});

const StoryCreaterContainer = css({
  width:  '100%',
  boxSizing: 'border-box'
});

class StoryApp extends Component {
  constructor() {
    super();
    this.state = ({
      encounterActions: []
    });

    this.addEncounterAction = this.addEncounterAction.bind(this);

  }

  addEncounterAction(encounterActionValues) {
    this.setState((prevState, props) => {
      const arrayPrevState = prevState.encounterActions;
      return {
        encounterActions: [...arrayPrevState, encounterActionValues]
      }
    });
  }

  render() {
    return (
      <div {...Container}>
        <Banner />
        <div {...StoryCreaterContainer}>
            <Route path={'/'} exact component={InitStory} />
            
            <Route path={'/create'} exact render={(props) => (
              <CreateStory {...props} encounterActions={this.state.encounterActions} />
            )}/>

            <Route path={'/create/add/encounteraction/:id'} render={(props) => (
              <AddEncounterAction {...props} addEncounterAction={this.addEncounterAction}/>
            )}/> 

        </div>
      </div>
    )
  }
}

export default StoryApp