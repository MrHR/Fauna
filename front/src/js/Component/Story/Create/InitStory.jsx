import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import { StoryCreateItem } from './../../../Actions/StoryActions';

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

    handleSubmit() {
      const data = this.state;
      this.props.createStory(this.state);
    }

    render () {
        return(
            <div className="page">
                <h2>Create a Story {this.props.story.loading ? <span>(loading)</span> : null} </h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="title"
                        value={this.state.title} 
                        onChange={this.handleChange} 
                        placeholder="Title" 
                    />
    
                    <textarea 
                        {...textarea}
                        name="description"
                        value={this.state.description} 
                        onChange={this.handleChange} 
                        placeholder="Description" 
                    />
    
                    {/* <input
                        className="button"
                        type="submit"
                        value="Start"                    
                    /> */}
                    
                    <a className="button" onClick={this.handleSubmit}>Start</a>
                
                </form>
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
    return {
      createStory: (data) => { dispatch(StoryCreateItem(data) )}
    }

  }
)(InitStory)
