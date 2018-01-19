import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const textarea = css({
    minHeight:'200px'
});

const ActionTumb = css({
    background: 'rgb(58, 58, 58)',
    width: '100px',
    height:'60px',
    lineHeight: '60px',
    textAlign: 'center',
    color: '#bbb',
    fontSize: '0.5em',
    display:'inline-block',
    marginRight: '10px;'
});

const buttonWrapper = css({
    width: '100px',
    height:'60px',
    textAlign: 'center',
    display:'inline-block',
    verticalAlign: 'top',
    '> a': {
        display:'block',
        background: 'rgb(55, 212, 152)',
        width:'30px',
        height:'30px',
        borderRadius:'50%',
        fontSize:'1em',
        color:'white',
        textDecoration: 'none',
        paddingTop:'5px',
        boxSizing: 'border-box',
        margin:'15px auto 0 auto',
        cursos:'pointer'
    }
});

class Encounter extends Component {
    constructor(props) {
        super(props);

        console.log("placeholder", props.placeholder)

        this.state = {
            encounter: '',
            placeholder: props.placeholder
        };

        this.handleCange = this.handleCange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render () {

        return(
            <div>
                <textarea 
                    {...textarea}
                    name="encounter"
                    value={this.state.description} 
                    onChange={this.handleCange} 
                    placeholder={this.state.placeholder} 
                />

                <div className="EncoutnerActionWrapper">
                    {/* {this.props.encounterActions.map((description, i) => 
                        <div {...ActionTumb} key={i}>
                            <span>{description}</span>
                        </div>
                    )} */}

                    <div {...ActionTumb}>
                        <span>Good</span>
                    </div>

                    <div {...ActionTumb}>
                        <span>Bad</span>
                    </div>

                    <div {...buttonWrapper}>
                        <Link to={'/Create/PickAdd'}>+</Link>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}

export default Encounter