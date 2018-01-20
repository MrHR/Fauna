import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import HorizontalScroll from '../UI/HorizontalScroll';

const textarea = css({
    minHeight:'200px'
});

const addEncounterActionButton = css({
    background: 'rgb(58, 58, 58)',
    width: '100%',
    height:'60px',
    lineHeight: '60px',
    textAlign: 'center',
    color: '#bbb',
    cursor:'pointer',
    fontSize: '1em',
    '> a' : {
        color:'white',
        textDecoration: 'none',
        cursor:'pointer'
    }
});

class Encounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            encounter: '',
            placeholder: props.placeholder,
            encounterActions: props.encounterActions
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

                <HorizontalScroll columnWidth={'100px'}>
                    {this.props.children}

                    <div {...addEncounterActionButton}>
                        <Link to={`/create/add/encounteraction/${this.state.id}`}>+</Link>
                    </div>
                </HorizontalScroll>
            </div>
        )
    }
}

export default Encounter