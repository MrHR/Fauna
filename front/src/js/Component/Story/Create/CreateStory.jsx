import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import Encounter from './UI/Encounter';
import EncounterActionWrapper from './UI/EncounterActionWrapper';
import Filter from '../../../functions/functions';
import { returnRandomArrayValue } from '../../../functions/functions';

const encPlaceholder = [
    "Surrounded by blossoming apple trees, the petals lightly rustling in the wind, Jhon continued...",
    "Marie violently woke up from her dream, she thought she heard someone enterning the room..."
];

const AddButton = css({
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
            title: '',
            description: ''
        }

        this.handleCange = this.handleCange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setRandomPlaceholder = this.setRandomPlaceholder.bind(this);

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

    render () {
        return(
            <div className="page">
                <h2>Create a Story</h2>
                <form onSubmit={this.handleSubmit}>

                    <Encounter placeholder={this.setRandomPlaceholder()} />

                    <button className="button" value="+" {...AddButton}>+</button>
                </form>
            </div>     
        )
    }
}

export default InitStory