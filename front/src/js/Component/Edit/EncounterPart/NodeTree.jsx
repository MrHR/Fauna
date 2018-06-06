import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Tree, treeUtil}  from 'react-d3-tree';

import { EncounterPartSelectActive, EncounterPartGetNodeTree } from './../../../Actions/EncounterPartActions'

const containerStyles = {
  width: '100%',
  height: '200px',
}

const styling = {
  links: {
    strokeWidth:0.3
  }
}

let tempTree = null;

class NodeTree extends Component {

	constructor(props) {
    super(props)
    this.state = {
      tree: null
    };

    this.findChild = this.findChild.bind(this);
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

  componentWillReceiveProps() {

    if(this.props.encounterParts.nodeTree) {
      this.setState(
        { tree: this.props.encounterParts.nodeTree},
        () => {
          tempTree = this.state.tree;
          this.findChild(tempTree[0], this.props.encounterParts.active)
        }
      );
    }
  }

  findChild(child, currChildID) {
    if(child.id !== currChildID) {
      child.nodeSvgShape.shapeProps.fill = '#888';
      child.children.forEach(child => this.findChild(child, currChildID))
    } else {
      child.nodeSvgShape.shapeProps.fill = '#37d498';
    }

    this.setState({tree: tempTree});
    return false;
  }
  
	render() {
		return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        { (tempTree) ? 
          <Tree 
            data={tempTree} 
            orientation={'vertical'} 
            pathFunc={'elbow'}
            collapsible={false}
            zoomable={false}
            transitionDuration={0}
            translate={this.state.translate}
            depthFactor={20}
            separation={{siblings: 0.4, nonSiblings: 0.4}}
            styles={styling}
          />
          : null }
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
		}
	}
)(NodeTree)