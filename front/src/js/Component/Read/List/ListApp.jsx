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
import Menu from '../../General/ListMenu';

const Stories = css({
	'> a': {
		textDecoration:'none',
		color:'white', 
		background:'rgb(55, 212, 152)',
		width:'50px !important',
		height:'50px !important',
		textAlign:'center',
		borderRadius:'50%'
	}

})

const listselect = css({
	display:'inline-block',
	height:'100%',
	minWidth:'40px',
	boxSizing:'border-box',
	textAlign:'center',
	'> input[type=checkbox]': {
		cursor:'pointer',
		marginLeft:'10px'
	}
})

const listTools = css({
	float:'right',
	position:'relative',
	top:'10px',
	right:'30px',
	'> button' : {
		border:'none',
		background:'transparent',
		width:'30px',
		opacity:'0.5',
		cursor:'pointer',
		':hover' : {
			opacity:'1'
		},
		':focus': {
			outline:'none'
		},
		'> img' : {
			width:'100%'
		}
	}
})

class StoryList extends Component {
	constructor() {
		super();

		this.state = {
			showSelectBoxes: false
		}

		this.handleDelete = this.handleDelete.bind(this)
		this.handleSelectClick = this.handleSelectClick.bind(this)
		this.handleUnselectClick = this.handleUnselectClick.bind(this)
	}

	componentDidMount() {
		this.props.fetchList();
		document.addEventListener('onmousedown', this.toggleMenu);
	}

	handleDelete(e) {
		console.log('deleted', e.currentTarget.dataset.key);
		this.props.deleteItem(e.currentTarget.dataset.uuid);
	}

	handleSelectClick() {
		this.setState({
			showSelectBoxes:true
		})
	}

	handleUnselectClick() {
		this.setState({
			showSelectBoxes:false
		})
	}

	render() {
		return (
			<div className={'page'}>
				<h2>Stories</h2>

				<div {...listTools}>
						<button className="btnDelete" onClick={this.handleDelete}>
							<img src={trash} alt="icon trash"/>
						</button>
				</div>
				
				<Menu>
					{ this.state.showSelectBoxes ?
						<div onClick={this.handleUnselectClick}>Unselect</div>
						:
						<div onClick={this.handleSelectClick} >Select</div>
					}
				</Menu>

				<ul>
					{this.props.story.list.map((index, key) => {
						return <ListItem key={key} data={index} handlePress={this.handlePress}>
							
							{
								this.state.showSelectBoxes ? 
								<div {...listselect} className="listSelect">
									<input type="checkbox" />
								</div>
								: null
							}					

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