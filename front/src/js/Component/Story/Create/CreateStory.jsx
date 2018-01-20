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


class InitStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            title: '',
            description: '',
            encounterActions: props.encounterActions,
            overview: true,
            openPopup: false
        }

        this.handleCange = this.handleCange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setRandomPlaceholder = this.setRandomPlaceholder.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.addEncounter = this.addEncounter.bind(this);

    }

    handleCange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    setRandomPlaceholder() {
        return returnRandomArrayValue(encPlaceholder);
    }

    openPopup() {
        this.setState({
            openPopup:true
        });
    }

    closePopup(event) {
        const target = event.target;
        if(target.classList.contains('popoverWrapper') || target.nodeName === 'IMG') {
            this.setState({
                openPopup:false
            });
        }   
    }

    addEncounter(event) {
        
    }

    render () {
        return(
            <div className="page">
                <h2>Create a Story</h2>

                <form onSubmit={this.handleSubmit}>

                    <Encounter id={1} placeholder={this.setRandomPlaceholder()}>
                        {this.state.encounterActions.map((object, i) =>
                            <EncounterAction key={i} object={object} />
                        )}
                    </Encounter>

                    {this.state.openPopup ? (
                        <StoryOptions closePopup={this.closePopup} addEncounter={this.addEncounter}/>
                    ) : null}

                    <button className="button" {...addButton} onClick={this.openPopup}>+</button>
                </form>

            </div>
        )
    }
}

export default InitStory