import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

class InitStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleCange = this.handleCange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render () {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleCange} placeholder="Title" />
            </form>     
        )
    }
}

export default InitStory