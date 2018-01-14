import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

class InitStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        }

        this.handleCange = this.handleCange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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

    render () {
        return(
            <div className="page">
                <h2>Create a Story</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="button"
                        type="submit"
                        value="+"                    
                    />
                </form>
            </div>     
        )
    }
}

export default InitStory