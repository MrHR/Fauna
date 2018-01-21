import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';


import Part from './Part'

import { EncounterPartFetchList } from './../../../Actions/EncounterPartActions';
import { EncounterFetchItem } from './../../../Actions/EncounterActions';

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
	constructor() {
		super()
	}
	componentDidMount() {
		this.props.fetchItem(this.props.match.params.encounter_uuid)
		this.props.fetchList(this.props.match.params.encounter_uuid)
	}
	render() {
		const { list } = this.props.encounterParts;
		const display = list.map((index, key) => {
			if(this.props.encounterParts.active && index.uuid === this.props.encounterParts.active){
				return <Part data={index} key={key} />
			}
		})
		return (
			<div {...part}>
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
			fetchItem: (data) => { dispatch( EncounterFetchItem(data) )}
		}
	}
)(EncounterPartApp)