// import React from 'react'
import { Button } from "reactstrap";
import {Component} from "react/cjs/react.production.min";
export default class  PostStatusFilter extends Component {
  constructor(props) {
    super(props);
    this.buttons = [
      {name: 'all', label: 'Все'},
      {name: 'like', label: 'Понравилось'},
    ]
  }

  render() {
    const buttons = this.buttons.map(({name,label}) => {
      const {filter, onFilterSelect} = this.props;
      const active = filter === name;
      const clazz = active ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button
          className={`btn ${clazz}`}
          key={name}
          type='button'
          onClick={() => onFilterSelect(name)}>
          {label}</button>
      )
    })
    return (
      <div className="btn-group">
        {buttons}
      </div>
    )
  }
}