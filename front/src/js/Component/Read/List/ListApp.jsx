import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import { StoryFetchList } from './../../../Actions/StoryActions'
import ListItem from './ListItem'
import CreateApp from './../../Create/CreateApp';

const Stories = css({
	'> a': {
		textDecoration:'none',
		color:'white', 
		background:'rgb(55, 212, 152)',
		width:'50px !important',
		height:'50px !important',
		textAlign:'center',
		borderRadius:'50%',

	}

})

class StoryList extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		this.props.fetchList();
	}
	render() {
		return (
			<div className={'page'}>
				<h2>Stories</h2>
				<ul>
					{this.props.story.list.map((index, key) => {
						return <ListItem key={key} data={index}/>
					})}
					<li>
						<Link to={'/Create'} exact component={CreateApp} className="button">+</Link>
					</li>
				</ul>
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
			fetchList: (data) => { dispatch(StoryFetchList(data))}
		}
	}
)(StoryList)