import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { StoryCreateItem } from './../../Actions/StoryActions'

const part = css({

})

const formField = css({

})

class InitStory extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			title: '',
			description: ''
		}
	}
	handleChange(e) {
		const curState = this.state;
		curState[e.target.name] = e.target.value;
	}

	handleSubmit() {
		this.props.createItem(this.state);
	}

	render() {
		return (

			<div {...part}>
				{ this.props.story.created === null ?
					<div>
						<h2>Create A Story</h2>
						<div {...formField}>
							<label htmlFor={'title'}>Title</label>
							<input type="text" name="title" onChange={(e) => this.handleChange(e) } placeholder={'title'} />
						</div>
						<div {...formField}>
							<label htmlFor={'description'}>Description</label>
							<textarea type="text" name="description" onChange={(e) => this.handleChange(e)} placeholder={'description'} />
						</div>
						<a className="button" onClick={this.handleSubmit}> Create Story </a>
					</div>
				:
					<div>
						<h2>{this.props.story.created.title}</h2>
						<p>{this.props.story.created.description}</p>
						<a>Edit</a>
					</div>
				}
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
			createItem: (data) => { dispatch( StoryCreateItem(data) )}
		}
	}
)(InitStory)