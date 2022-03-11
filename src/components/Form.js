import React, { Component } from "react";

class Form extends Component{

    constructor(props) {
        super(props)

        this.state = {
            comment: ''
        }
    }

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleSubmit = event => {
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Comment: </label>
                    <textarea value={this.state.comment} onChange={this.handleCommentChange}/>
                    <button type="submit">Submit</button>
                </div>
            </form>
        )
    }

}

export default Form