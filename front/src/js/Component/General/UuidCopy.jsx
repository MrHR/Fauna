import React, { Component } from 'react';
import { css } from 'glamor';
import Clipboard from 'clipboard';
import { withRouter } from 'react-router-dom';

import icon_copy from './../../../../public/images/icon_copy.svg';

import Notification from './../General/Notification';

const uuidCopy = css({
	padding:'20px 0',
	display:'block',
	maxWidth:'100%',
	'> button': {
    position:'relative',
    top:'-10px',
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center',
		width:'100%',
		maxWidth:'290px',
		textAlign:'left',
		color:'#666',
		border:'none',
		backgroundColor:'transparent',
		cursor:'pointer',
    padding:'0',
		float:'right',
		overflow:'hidden',
		':focus' : {
			outline: 'none'
		},
		'> img': {
			width:'15px',
			float:'right',
			verticlaAlign:'middle',
			order:'3'
		}
	}
	
})

const style = ({
  clear:'both'
})

class UuidCopy extends Component { 

  constructor(props) {
    super(props);
    this.state = {
			showNotification: false
		}
  }

  componentDidMount() {
		//copy shit to clipboard
		const buttonIdSelector = `#cmdCopy`;
		this.clipboard = new Clipboard(
			buttonIdSelector, {
				target: () => document.getElementById('txtCopyValue')
			}
		);

		this.clipboard.on('success', () => {
			this.setState({showNotification: true})

			setTimeout(() => {
				this.setState({showNotification: false})
			}, 1000)

		})

	}

  render() {
    return (
      <div {...uuidCopy}>
        <button id={'cmdCopy'}>
					<img src={icon_copy} alt={'copy icon'} />
          <span><b>{this.props.uuidName}</b>&nbsp;</span>
          <span id={'txtCopyValue'}>{this.props.children}</span>
        </button>

        <Notification active={this.state.showNotification}>
          Copied!
        </Notification>

      </div>
    )
  }
}

export default UuidCopy