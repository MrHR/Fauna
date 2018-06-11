import React, { Component } from 'react';
import { css } from 'glamor';

const notification = css({
  boxSizing:'border-box',
  width:'80px',
  display:'inline-block',
  position:'fixed',
  left:'calc(50% - 40px)',
  bottom:'10%',
  backgroundColor:'rgb(102, 102, 102, 0.8)',
  color:'white',
  textAlign:'center',
  fontWeight:'100',
  fontSize:'0.8em',
  borderRadius:'20px',
  padding:'10px 5px',
  zIndex:'2000'
})

class Notification extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      active: newProps.active
    })
  }

  render() {
    let visible = 'hidden';
    let opacity = 0;

    this.state.active ? visible = 'visible' : visible = 'hidden';
    this.state.active ? opacity = 1 : opacity = 0;

    return (
      <div>
        {this.state.active ? 
          <div {...notification}>
            {this.props.children}
          </div> 
          :
          null
        }
      </div>
    )
  }
}

export default Notification