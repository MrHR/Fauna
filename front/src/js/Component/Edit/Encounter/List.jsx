import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterFetchList } from './../../../Actions/EncounterActions'
import Item from './Item';

class List extends Component {

	constructor() {
		super();
		this.state = {
			character_uuid: '',
			description: ''
		}
	}
	componentDidMount() {
		this.props.fetchList(this.props.uuid)
	}

	render() {
		return (
			<div>
				<h4>Encounters</h4>
				<ul>
					{
						this.props.encounter.list.length <= 0 ?
							<p>Add some encounters to see them here</p>
						:
							this.props.encounter.list.map((index, key) => {
								return <Item data={index} key={key} />
							})
					}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter
		}
	}, 
	dispatch => {
		return {
			fetchList: (data) => { dispatch( EncounterFetchList(data) )}
		}
	}
)(List)