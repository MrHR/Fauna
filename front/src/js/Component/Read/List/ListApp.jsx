import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css, select } from 'glamor';
import { Link } from 'react-router-dom';
import '../../../../css/style.css';


import { StoryFetchList } from './../../../Actions/StoryActions'
import { StoryDeleteItem, ReadModeToggle } from './../../../Actions/StoryActions'
import { userLogout } from './../../../Actions/UserActions';
import ListItem from './ListItem'
import trash from '../../../../../public/images/icon_trash.png';
import Menu from '../../General/ListMenu';
import icon_read from './../../../../../public/images/icon_read.svg';
import icon_edit from './../../../../../public/images/icon_edit.svg';

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
	top:'8px',
	right:'30px',
	maxWidth:'0',
	width:'auto',
	visibility:'hidden',
	textAlign:'right',
	transition:'500ms all',
	padding:'4px',
	overflow:'hidden',
	background:'#cfcfcf',
	'> button' : {
		border:'none',
		background:'transparent',
		width:'27px',
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

const readLink = css({
	textDecoration: 'none',
	color:'black',
	'> img': {
		width:'15px',
		display:'inline-block',
		float:'left'
	}
})

class StoryList extends Component {
	constructor() {
		super();

		this.state = {
			showSelectBoxes: false,
			selectedStories: [],
			readMode: false
		}

		this.handleDelete = this.handleDelete.bind(this)
		this.handleSelectClick = this.handleSelectClick.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.toggleReadMode = this.toggleReadMode.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	componentDidMount() {
		this.props.fetchList();
		document.addEventListener('onmousedown', this.toggleMenu);

		console.log('process: ', process.env)
	}

	componentWillReceiveProps(newProps) {
		if(newProps.user.logout) {
			this.props.history.push('/login')
		}
	}

	handleDelete(e) {
		if(this.state.selectedStories.length > 0) { 
			this.state.selectedStories.forEach((storyId) => {
				this.props.deleteItem(storyId)
			})
		}
	}

	handleSelectClick() {
		console.log('show trash icon')

		this.setState(prevState => ({
			showSelectBoxes:!prevState.showSelectBoxes
		}))

		if(this.state.showSelectBoxes) {
			document.getElementById("listTools").classList.remove('slideLeft200');
		} else {
			document.getElementById('listTools').classList.add('slideLeft200');
		}
	}

	handleInputChange(event) {
		const target = event.target;

		if(target.type === 'checkbox' && target.checked) {
			this.setState(prevState => ({
				selectedStories: [...prevState.selectedStories, target.dataset.key]
			}));
		} else {
			const array = this.state.selectedStories;
			const index = this.state.selectedStories.indexOf(target.dataset.key);
			if(index > -1) {
				array.splice(index, 1);
			}			

			this.setState({
				selectedStories: array
			});
		}
	}
	
	toggleReadMode() {
		this.setState({
			readMode:!this.state.readMode
		})

		this.props.toggleReadMode();
	}

	handleLogout() {
		this.props.logout();
	}

	render() {
		return (
			<div className={'page'}>
				<h2>Stories</h2>

				<div id="listTools" {...listTools}>		
					<button className="btnDelete" onClick={this.handleDelete}>
						<img src={trash} alt="icon trash"/>
					</button>
				</div>

				<Menu>
					<div>
						{ !this.props.story.readMode ? 
							(this.state.showSelectBoxes ?
								<div onClick={this.handleSelectClick}>Clear selection</div>
								:
								<div onClick={this.handleSelectClick} >Select</div>
							)
							: null
						}
	
						{!this.state.readMode ? 
							<div onClick={this.toggleReadMode}>
								<img src={icon_read} alt={"icon read"}/>
								Read Mode
							</div>
						:
							<div onClick={this.toggleReadMode}>
								<img src={icon_edit} alt={"icon read"}/>
								Edit Mode
							</div>
						}

						<div onClick={this.handleLogout}>
							Logout
						</div>

					</div>
				</Menu>

				<ul>
					{this.props.story.list.map((index, key) => {
						return <ListItem key={key} data={index}>
							
							{
								this.state.showSelectBoxes ? 
								<div {...listselect} className="listSelect">
									<input type="checkbox" data-key={index.uuid} onChange={this.handleInputChange}/>
								</div>
								: null
							}					

						</ListItem>
					})}

					{!this.props.story.readMode ?
						<li>
							<Link to={'/Create'} className="button">+</Link>
						</li>
						:null
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
			user: state.user
		}
	},
	dispatch => {
		return {
			fetchList: (data) => { dispatch(StoryFetchList(data)) },
			deleteItem: (id) => { dispatch(StoryDeleteItem(id) )},
			toggleReadMode: () => { dispatch(ReadModeToggle() )},
			logout: (data) => { dispatch( userLogout(data) )}
		}
	}
)(StoryList)