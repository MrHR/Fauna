import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';

import { StoryCreateItem, StoryFetchItem, StoryUpdateItem } from './../../Actions/StoryActions'

const part = css({

})

const formField = css({

})

class InitStory extends Component {
	constructor() {
		super()
		this.state = {
			uuid: '',
			title: '',
			description: '',
			fireRedirect: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
	}

	componentDidMount() {
		if(this.props.match.params.uuid !== null) {
			this.props.fetchItem(this.props.match.params.uuid);
			this.setState({ uuid: this.props.match.params.uuid })
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.story.detail != this.props.story.detail) {
			this.setState({
				title: nextProps.story.detail.title,
				description: nextProps.story.detail.description
			})
		}
	}
	
	handleChange(e) {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	handleSubmit() {
		this.props.createItem(this.state);
		this.setState({
			fireRedirect: true
		})
	}

	handleUpdate() {
		this.props.updateItem(this.state);
		this.setState({
			fireRedirect: true
		})
	}

	render() {
		const { fireRedirect } = this.state;

		return (
			<div {...part}>
				{ !this.props.match.params.uuid ?
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
						<h2>Update your Story</h2>
						<div {...formField}>
							<label htmlFor={'title'}>Title</label>
							<input type="text" name="title" onChange={(e) => this.handleChange(e) } placeholder={'title'} value={this.state.title}/>
						</div>
						<div {...formField}>
							<label htmlFor={'description'}>Description</label>
							<textarea type="text" name="description" onChange={(e) => this.handleChange(e)} placeholder={'description'}  value={this.state.description}/>
						</div>
						<a className="button" onClick={this.handleUpdate}> Update Story </a>
					</div>
				}

				{fireRedirect && (
          <Redirect to={'/'}/>
        )}
			</div>
			

		)
	}
}	

export default withRouter(connect(
	state => {
		return {
			story: state.story
		}
	}, 
	dispatch => {
		return {
			createItem: (data) => { dispatch( StoryCreateItem(data) )},
			fetchItem: (data) => { dispatch( StoryFetchItem(data) )},
			updateItem: (data) => {dispatch( StoryUpdateItem(data) )}
		}
	}
)(InitStory))