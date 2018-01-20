import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const textarea = css({
    minHeight:'200px'
});

class Encounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            encounter: '',
            placeholder: props.placeholder
        };

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
            <div>
                <textarea 
                    {...textarea}
                    name="encounter"
                    value={this.state.description} 
                    onChange={this.handleCange} 
                    placeholder={this.state.placeholder} 
                />

                {this.props.children}
            </div>
        )
    }
}

export default Encounter