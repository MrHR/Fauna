import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { StoryFetchItem } from './../../../Actions/StoryActions'

import Create from './Create'
import List from './List'
import UuidCopy from './../../General/UuidCopy'

const header = css({
	marginBottom:'60px'
})

const link = css({
	textDecoration:'none',
	padding:'5px',
	cursor:'pointer',
	color:'white',
	backgroundColor:'black',
	borderRadius:'5px',
	fontSize:'0.8em',
	position:'absolute',
	top:'100px',
	opacity:'0.5',
	'::before' : {
		content:'<'
	},
	':hover' : {
		opacity:'1'
	}
})

class EncounterPartApp extends Component {
	constructor() {
		super()

	}

	componentDidMount() {
		this.props.fetchItem(this.props.match.params.uuid);
	}

	render() {

		return (
			<div>
				{ this.props.story.detail ? 
					<div>
						<h3 {...header}>{this.props.story.detail.title}</h3>
						<Link {...link} to={`/`}>&nbsp;back</Link>

						{this.props.story.detail && !this.props.story.readMode ? 
							<UuidCopy uuidName={'story uuid:'}>{this.props.story.detail.uuid}</UuidCopy>
						:null}
						
						<List uuid={this.props.match.params.uuid} />
						
						{!this.props.story.readMode ? <Create /> : null}

					</div>
				: <span>loading</span> }
			</div>
		)
	}
}

export default withRouter(connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter
		}
	}, 
	dispatch => {
		return {
			fetchItem: (data) => { dispatch( StoryFetchItem(data) )}
		}
	}
)(EncounterPartApp))