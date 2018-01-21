import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router'

import InitStory from './Create/InitStory'
import ListApp  from './List/ListApp'
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
  constructor(props) {
    super(props);
    this.state = ({
      encounterActions: []
    });

    this.addEncounterAction = this.addEncounterAction.bind(this);
    this.setEncounterActionState = this.setEncounterActionState.bind(this);

  }

  //add Encounter Action
  addEncounterAction(encounterActionValues) {

    this.setState((prevState, props) => {
      const arrayPrevState = prevState.encounterActions;
      let tempEncounterActionValues = encounterActionValues;
      tempEncounterActionValues.Id = arrayPrevState.length + 1;
      const newEncounterActionValues = tempEncounterActionValues;
      
      return {
        encounterActions: [...arrayPrevState, newEncounterActionValues]
      }

    });
  }

  //Set state after clicking an encounter action
  setEncounterActionState(encounterActionValue) {
    this.setState((prevState, props) => {
      const arrayPrevState = prevState.encounterActions;
      const newArray = arrayPrevState.map((object, i) => {
          if(object.Id !== encounterActionValue.Id) {
            let newObject = object;
            newObject.clicked = false;
            return newObject;
          } else {
            return encounterActionValue;
          }
        });
      
      return {
        encounterActions: newArray
      }

    });
  }

  render() {
    return (
      <div {...Container}>
        <Banner />
        <div {...StoryCreaterContainer}>
          <Route path={'/list'} exact component={ListApp} />

          { this.props.story.created === null ?
            <Route path={'/'} exact component={InitStory} />
          : <Route path={'/'} exact component={CreateStory} /> }
{/*
            <Route path={'/create'} exact render={(props) => (
              <CreateStory 
                {...props} 
                encounterActions={this.state.encounterActions} 
                setEncounterActionState={this.setEncounterActionState}
              />
            )}/>*/}

{/*            <Route path={'/create/add/encounteraction/:id'} render={(props) => (
              <AddEncounterAction {...props} addEncounterAction={this.addEncounterAction}/>
            )}/> 
*/}
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      story: state.story
    }
  },
  dispatch => {
    return {}
  }
)(StoryApp)
