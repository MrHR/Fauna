import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const textarea = css({
    minHeight:'100px'
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
                        type="text" 
                        name="title"
                        value={this.state.title} 
                        onChange={this.handleCange} 
                        placeholder="Title" 
                    />
    
                    <textarea 
                        {...textarea}
                        name="description"
                        value={this.state.description} 
                        onChange={this.handleCange} 
                        placeholder="Description" 
                    />
    
                    {/* <input
                        className="button"
                        type="submit"
                        value="Start"                    
                    /> */}
                    
                    <Link to={'/Create'} className="button">Start</Link>
                
                </form>
            </div>     
        )
    }
}

export default InitStory