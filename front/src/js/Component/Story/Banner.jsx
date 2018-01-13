import React, { Component } from 'react';
import { css } from 'glamor';

const container = css({
    padding:'20px',
    '> h1' : {
      fontSize: '1.5em',
      color: '#fff'
    }
});

class Banner extends Component {
  render() {
    return (
      <div {...container} className="banner">
        <h1>Story Title</h1>
      </div> 
    )
  }
}

export default Banner