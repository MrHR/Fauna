import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Tree from 'react-d3-tree';

import { EncounterPartSelectActive, EncounterPartGetNodeTree } from './../../../Actions/EncounterPartActions'

const myTreeData = [
  {
    name: '',
    attributes: {
    },
    children: [
      {
        name: '',
        attributes: {
        },
      },
      {
        name: '',
        attributes: {
        },
      },
    ],
  },
];

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width:15,
    height:10,
    x:-7.5,
    y:-5,
    fill: '#37d498',
    strokeWidth:0
  }
}

const containerStyles = {
  width: '100%',
  height: '100px',
}

const styling = {
  links: {
    strokeWidth:0.3
  }
}

class NodeTree extends Component {

	constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    });
  }
  
	render() {
		return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree 
          data={myTreeData} 
          orientation={'vertical'} 
          nodeSvgShape={svgSquare}
          pathFunc={'elbow'}
          collapsible={false}
          zoomable={false}
          transitionDuration={0}
          translate={this.state.translate}
          depthFactor={20}
          separation={{siblings: 0.4, nonSiblings: 0.4}}
          styles={styling}
        />
      </div>
		)
	}
}

export default connect(
	state => {
		return {
      story: state.story,
      encounter: state.encounter,
			encounterParts: state.encounterParts
		}
	}, 
	dispatch => {
		return {
      //selectEncounterPart: (id) => dispatch(EncounterPartSelectActive(id)),
      //getNodeTree: (id) => dispatch(EncounterPartGetNodeTree(id))
		}
	}
)(NodeTree)