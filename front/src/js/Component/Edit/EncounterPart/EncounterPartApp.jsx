import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';


import Part from './Part'

import { EncounterPartFetchList } from './../../../Actions/EncounterPartActions';
import { EncounterFetchItem } from './../../../Actions/EncounterActions';
import { StoryFetchItem } from './../../../Actions/StoryActions';
import NodeTree from './NodeTree';
import UuidCopy from './../../General/UuidCopy';

const Header = css({
	display:'inline-block'
})

class EncounterPartApp extends Component {
	constructor() {
		super()
	}

	componentDidMount() {
		this.props.fetchItem(this.props.match.params.encounter_uuid)
		this.props.fetchList(this.props.match.params.encounter_uuid)
		this.props.fetchStoryItem(this.props.match.params.uuid)
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

				{!this.props.story.readMode ? <NodeTree/> : null}

				{this.props.encounter.detail && !this.props.story.readMode ? 
					<UuidCopy uuidName={'encounter uuid:'}>{this.props.encounter.detail.uuid}</UuidCopy>
				:null}

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