import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

const part = css({
	backgroundColor: '#fff',
	margin: 'auto',
	padding: '50px',
	marginBottom: '30px'
})
class TitleApp extends Component {
	render() {
		return (
			<div {...part}>
				<h1>{this.props.story.detail.title}</h1>
				<p>{this.props.story.detail.description}</p>
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
		}
	}
)(TitleApp)