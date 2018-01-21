import React, { Component } from 'react';
import { css } from 'glamor';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

import Encounter from './UI/Encounter';
import Filter from '../../../functions/functions';
import { returnRandomArrayValue } from '../../../functions/functions';
import AddEncounterAction from './AddEncounterAction';
import StoryApp from '../StoryApp';
import StoryOptions from '../Create/UI/popups/StoryOptions';
import EncounterAction from './UI/EncounterAction';

const encPlaceholder = [
    "Surrounded by blossoming apple trees, the petals lightly rustling in the wind, Jhon continued...",
    "Marie violently woke up from her dream, she thought she heard someone enterning the room..."
];

const addButton = css({
    position: 'fixed',
    bottom: '10px',
    margin: '10px 20px 10px 20px',
    width: 'calc(100% - 40px) !important',
    maxWidth: '800px'
});


class CreateEncounterApp extends Component {
    constructor(props) {
      super(props);
      this.addEncounter = this.addEncounter.bind(this);
    }

    addEncounter(event) {
    }

    render () {
        return(
            <div className="page">
                <h2>Create storyLine</h2>
                
                
            </div>
        )
    }
}

export default CreateEncounterApp