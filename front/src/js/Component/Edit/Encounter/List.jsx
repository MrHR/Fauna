import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterFetchList } from './../../../Actions/EncounterActions'
import Item from './Item';

const part = css({
	backgroundColor: '#fff',
	margin: 'auto',
	padding: '50px',
	marginBottom: '30px'
})
class List extends Component {

	constructor() {
		super();
		this.state = {
			character_uuid: '',
			description: ''
		}
	}
	componentDidMount() {
		this.props.fetchList(this.props.story.detail.uuid)
	}



	render() {
		return (
			<div {...part}>
				<ul>
					{this.props.encounter.list.map((index, key) => {
						return <Item data={index} key={key} />
					})}
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