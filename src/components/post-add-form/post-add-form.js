import React from 'react';
import {Component} from "react/cjs/react.production.min";

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onValueChange(event){
      this.setState({
        text: event.target.value
      });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.state.text)
    this.setState({
      text: ''
    })
  }

  render() {
  return (
    <form
      className="bottom-panel d-flex" action=""
      onSubmit={this.onSubmit}>
      <input
              className="form-control new-post-label"
              type="text"
              placeholder="Введите текст"
              onChange={this.onValueChange}
              value={this.state.text}
      />
      <button
        className = 'btn btn-outline-secondary'
        type = 'submit'
      >
        Добавить
      </button>
    </form>
   )
  }
}
