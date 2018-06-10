import React, { Component } from 'react';
import { css } from 'glamor';
import icon_menu from '../../../../public/images/icon_menu.svg';

const menuWrapper = css({
  position:'absolute',
  right:'20px',
  top:'20px',
  marginTop:'10px'
})

const Button = css({
    width:'20px',
    opacity:'0.4',
    border:'none',
    backgroundColor:'transparent',
    cursor: 'pointer',
    ':hover': {
      opacity:'1'
    },
    ':focus': {
      outline:'none',
      opacity:'1'
    }
})

const menu = css({
  position:'absolute',
  zIndex:'1000',
  backgroundColor:'white',
  right:'0',
  top:'0',
  width:'140px',
  textAlign:'right',
  boxSizing:'border-box',
  '> div div': {
    padding:'10px 5px',
    borderTop:'1px solid #ddd',
    borderBottom:'1px solid #ddd',
    cursor:'pointer',
    '> img': {
      width:'15px',
      display:'inline-block',
      float:'left'
    }
  }, 
  '> div div:hover': {
    backgroundColor:'#eee'
  }
})



export default class ListMenu extends Component {
	constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }
  
  toggleMenu(e) {
		this.setState(prevState => ({
			showMenu: !prevState.showMenu
		}));
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      })
    }
  } 

  handleClick() {
    this.setState({
      showMenu:false
    })
  }

	render() {
		return (
      <div {...menuWrapper} ref={this.setWrapperRef}>
        <button {...Button} onClick={this.toggleMenu}><img src={icon_menu} alt="icon menu"/></button>

        { this.state.showMenu ?
            <nav {...menu} onClick={this.handleClick}>
              {this.props.children}
            </nav>
          : null
        }

      </div>
		)
	}
}

ListMenu.propTypes = {
  children: React.PropTypes.element.isRequired
}