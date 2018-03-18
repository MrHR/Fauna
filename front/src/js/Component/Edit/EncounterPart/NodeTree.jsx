import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterPartSelectActive, EncounterPartGetNodeTree } from './../../../Actions/EncounterPartActions'

const Tree = css({
  display:'block',
  textAlgin:'center',
  width:'100%'
})

const rectWidth = 3,
      rectHeight = 2,
      y = rectHeight,
      offset = rectWidth*2;

class NodeTree extends Component {

	constructor(props) {
    super(props)
    
    this.state = {
      treeW: 0,
      treeH: 0,
    }

  }

  componentDidMount() {
    const width = document.querySelector('.nodeTree').clientWidth,
    height = document.querySelector('.nodeTree').clientHeight;
    
    this.setState({
      treeW: width,
      treeH: height,
      lineMiddle: (width/2)/width*100,
      rectMiddle:(width/2)/width*100 - (rectWidth/2),
    });
  }
  
	render() {

  //   // console.log('story in return', this.props.encounterParts)
  //   console.log('part list', this.props)

  //   const list = this.props.encounterParts.list;
  //   const active = this.props.encounterParts.active;
  //   let parents = 0;
  //   let children = 0;
  //   let siblings = 0;

  //   // list.filter(function (item) {
  //   //   switch(item.follows) {
  //   //     case :
  //   //       parents++
  //   //       break;
  //   //     case active:
  //   //       children++;
  //   //       break;
  //   //     case 
  //   //   }
  //   // });

    //console.log('pars', parents)

    const x = this.state.lineMiddle,
    rx = this.state.rectMiddle,
    level = 5,
    ofLevel = 2

    const svg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" className="nodeTree">
					<title>svg_tree</title>
					<g id="Layer_2" data-name="Layer 2">
						<g id="Layer_1-2" data-name="Layer 1">
              <g className="minimap_encounterpart minimap_encounterpart_first">
                <rect className="rect" x={rx} y="0" width={rectWidth} height={rectHeight}/>
                <line className="con_vert" x1={x} y1={y} x2={x} y2={y*2} stroke="black" strokeWidth="0.1"/>
              </g>
              
              <g className="minimap_encounterpart minimap_encounterpart_left">
                <line className="con_hor" x1={x-offset} y1={y*2} x2={x} y2={y*2} stroke="black"  strokeWidth="0.1"/>
                <line className="con_vert" x1={x-offset} y1={y*2} x2={x-offset} y2={y*3} stroke="black"  strokeWidth="0.1"/>
                <rect className="rect" x={rx-offset} y={y*3} width={rectWidth} height={rectHeight}/>
              </g>

              <g className="minimap_encounterpart minimap_encounterpart_center">
                <rect className="rect" x={rx} y={y*3} width={rectWidth} height={rectHeight}/>
                <line className="con_vert" x1={x} y1={y*2} x2={x} y2={y*3} stroke="black"  strokeWidth="0.1"/>
              </g>

              <g className="minimap_encounterpart minimap_encounterpart_right">
                <line className="con_hor" x1={x+offset} y1={y*2} x2={x} y2={y*2} stroke="black"  strokeWidth="0.1"/>
                <line className="con_vert" x1={x+offset} y1={y*2} x2={x+offset} y2={y*3} stroke="black"  strokeWidth="0.1"/>
                <rect className="rect" x={rx+offset} y={y*3} width={rectWidth} height={rectHeight}/>
              </g>

              <g className="minimap_encounterpart minimap_encounterpart_right">
                <line className="con_hor" x1={x+offset*2} y1={y*2} x2={x+offset} y2={y*2} stroke="black"  strokeWidth="0.1"/>
                <line className="con_vert" x1={x+offset*2} y1={y*2} x2={x+offset*2} y2={y*3} stroke="black"  strokeWidth="0.1"/>
                <rect className="rect" x={rx+offset*2} y={y*3} width={rectWidth} height={rectHeight}/>
              </g>
            </g>
					</g>
				</svg>
    );


		return (
      <div {...Tree}>
        {svg}
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
      selectEncounterPart: (id) => dispatch(EncounterPartSelectActive(id)),
      //getNodeTree: (id) => dispatch(EncounterPartGetNodeTree(id))
		}
	}
)(NodeTree)