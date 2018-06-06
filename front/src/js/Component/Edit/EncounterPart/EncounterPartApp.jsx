import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';


import Part from './Part'

import { EncounterPartFetchList } from './../../../Actions/EncounterPartActions';
import { EncounterFetchItem } from './../../../Actions/EncounterActions';
import { StoryFetchItem } from './../../../Actions/StoryActions';
import NodeTree from './NodeTree';

const Header = css({
	display:'inline-block'
})

const formField = css({
	display: 'block',
	marginBottom: '10px',
	'> input': {
		width: '100px',
		height :'30px',
		lineHeight :'30px',
		backgroundColor: '#fff',
		display: 'block',
		border: '1px solid #333'
	}
})
const part = css({
	backgroundColor: '#fff',
	margin: 'auto',
	padding: '50px',
	marginBottom: '30px'
})

class EncounterPartApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			encounterPart_uuid: null,
			fetchedList: false
		};
	}

	componentDidMount() {
		this.props.fetchItem(this.props.match.params.encounter_uuid)
		this.props.fetchList({
			encounter_uuid: this.props.match.params.encounter_uuid,
			encounterPart_uuid: this.state.encounterPart_uuid
		})
		this.props.fetchStoryItem(this.props.match.params.uuid)
	}

	componentWillReceiveProps() {
		if(!this.state.fetchedList && !this.state.encounterPart_uuid)
			this.setState({encounterPart_uuid: this.props.encounterParts.active});

		if(!this.state.fetchedList && this.state.encounterPart_uuid) {
			this.props.fetchList({
				encounter_uuid: this.props.match.params.encounter_uuid,
				encounterPart_uuid: this.state.encounterPart_uuid
			});

			this.setState({
				fetchedList: true
			});
		}
		
	}

	render() {
		const { list } = this.props.encounterParts;
		const display = list.map((index, key) => {
			if(this.props.encounterParts.active && index.uuid === this.props.encounterParts.active){
				return <Part data={index} key={key} />
			}
		})

		return (
			<div>
				<h3 {...Header}>{this.props.story.detail ? this.props.story.detail.title : '(Loading)'}</h3>
				<NodeTree/>
				{display}
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter,
			encounterParts: state.encounterParts
		}
	}, 
	dispatch => {
		return {
			fetchList: (data) => { dispatch( EncounterPartFetchList(data) )},
			fetchItem: (data) => { dispatch( EncounterFetchItem(data) )},
			fetchStoryItem: (data) => { dispatch( StoryFetchItem(data) )}
		}
	}
)(EncounterPartApp)