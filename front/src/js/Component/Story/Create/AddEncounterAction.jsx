import React, { Component } from 'react';
import { css } from 'glamor';
import { Router, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const textarea = css({
    minHeight: '200px'
})

class AddEncounterAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounterId: props.match.params.id,
            keyword: '',
            description: '',
            fireRedirect: false
        }

        console.log('add encounter action id', props.match.params.id);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formValues = {
            encounterId: this.state.encounterId,
            keyword: this.state.keyword,
            description: this.state.description,
            clicked: false
        }

        this.props.addEncounterAction(formValues);

        this.setState({ fireRedirect: true });
    }

    render () {

        const { fireRedirect } = this.state;

        return(
            <div className="page">
                <h2>Add an action</h2>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="keyword"
                        value={this.state.keyword} 
                        onChange={this.handleChange} 
                        placeholder="Keyword" 
                        maxLength="30"
                    />
    
                    <textarea 
                        {...textarea}
                        name="description"
                        value={this.state.description} 
                        onChange={this.handleChange} 
                        placeholder="Description" 
                        maxLength="200"
                    />

                    <input
                        className="button"
                        type="submit"
                        value="Add"                    
                    />

                </form>

                {fireRedirect && (
                    <Redirect to={'/create'} />
                )}
                
            </div>
        )
    }
}

export default AddEncounterAction