import React, { Component } from 'react';
import { css } from 'glamor';

const container = css({
  width: '100%',
  marginTop: '50px',
  marginLeft: 'auto',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
  '> h1': {
    fontSize: '20px',
    marginBottom: '10px'
  },
  '> p': {
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'justify'
  }
})

class Introduction extends Component {
  render() {
    return (
      <div {...container}>
        <h1>Create Your Story Here</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, ex vel euismod ultrices, turpis lectus dignissim augue, nec auctor lacus augue non elit. Sed odio ligula, tincidunt ut placerat semper, eleifend vel arcu. Aenean non velit quis arcu consectetur ornare. Fusce id pharetra elit, vel aliquam sapien. Donec leo massa, egestas vehicula tempor nec, cursus eu est. Sed elementum arcu ex, tincidunt vestibulum purus porta et. Etiam ligula neque, gravida a ligula vel, tristique iaculis lorem. Cras lobortis interdum faucibus. Praesent luctus, est et consectetur faucibus, nisl velit viverra ligula, in dapibus risus tortor et augue. Donec eu aliquet nunc, ac molestie felis.
        </p>
      </div> 
    )
  }
}

export default Introduction