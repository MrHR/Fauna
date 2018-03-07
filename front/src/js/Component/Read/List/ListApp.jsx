import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Link } from 'react-router-dom';
import '../../../../css/style.css';
import Hammer from 'react-hammerjs';


import { StoryFetchList } from './../../../Actions/StoryActions'
import { StoryDeleteItem } from './../../../Actions/StoryActions'
import ListItem from './ListItem'
import CreateApp from './../../Create/CreateApp';
import trash from '../../../../../public/images/icon_trash.png';

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
		super();

		this.handleDelete = this.handleDelete.bind(this);
		this.handleSwipe = this.handleSwipe.bind(this);
		this.handlePress = this.handlePress.bind(this)
	}

	componentDidMount() {
		this.props.fetchList();
	}

	handleDelete(e) {
		console.log('deleted', e.currentTarget.dataset.key);
		this.props.deleteItem(e.currentTarget.dataset.uuid);
	}

	handleSwipe(e) {
		console.log(e);
	}

	handlePress(e) {
		console.log('press')
	}

	render() {
		return (
			<div className={'page'}>
				<h2>Stories</h2>
				<ul>
					{this.props.story.list.map((index, key) => {
						return <ListItem key={key} data={index} handlePress={this.handlePress}>
							<button className="btnDelete" data-uuid={index.uuid} onClick={this.handleDelete}><img src={trash} alt="icon trash"/></button>
						</ListItem>
					})}
					<li>
						<Link to={'/Create'} className="button">+</Link>
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
			fetchList: (data) => { dispatch(StoryFetchList(data)) },
			deleteItem: (id) => { dispatch(StoryDeleteItem(id) )}
		}
	}
)(StoryList)