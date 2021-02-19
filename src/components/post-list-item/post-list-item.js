
import {Component} from "react/cjs/react.production.min";
import * as events from "events";


export default class PostListItem extends Component {

  render() {
    // this.who();
    const {label, onDelete, onToggleImportant,onToggleLiked, important, like} = this.props;
    let classNames = 'app-list-item d-flex justify-content-between'

    if (important) {
      classNames += ' important';
    }

    if (like) {
      classNames += ' like';
    }

    return (
      <div className={classNames}  >
      <span className="app-list-item-label" onClick={onToggleLiked}>
        {label}
      </span>
        <div className="d-flex justify-content-center align-items-center">

          <button className="btn-star btn-sm"
                  type='button'
                  onClick={onToggleImportant}>
            <i className="fa fa-star"/>
          </button>
          <button className="btn-trash btn-sm"
                  type='button'
                  onClick={onDelete}>
            <i className="fa fa-trash"/>
          </button>
          <i className="fa fa-heart"/>
        </div>

      </div>
    )
  }
}


