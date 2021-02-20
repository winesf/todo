// import React from 'react'
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import styled from "styled-components";
import {Component} from "react/cjs/react.production.min";

const Appblock = styled.div`
   margin: 0 auto;
  max-width: 800px;
`

export default class App  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {label: 'Задача 1', important: false , id: 1 ,like: false},
        {label: 'Задача 2', important: false, id: 2 ,like: false},
        {label: 'Задача 3', important: false ,id: 3 ,like: false},
        {label: 'Задача 4', important: true, id: 4 ,like: false}
      ],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 4;
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: ++this.maxId
    }
    this.setState(({data}) => {
      const  newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  deleteItem(idOut){
    console.log('пробуем удалиться')
    this.setState(({data}) => {
      const index = data.findIndex( elem => elem.id === idOut)
      const before = data.slice(0, index);


      const newArr = [...before, ...data.slice(index + 1) ]
      return {
        data: newArr
      }
    });
  }
  searchPost(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter( (item) => {
      return item.label.indexOf(term) > -1
    });
  }
  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex( elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, important: !old.important};

      const newArr = [...data.slice(0, index),newItem ,...data.slice(index + 1)];
      return {
        data : newArr
      }
    })
  }

  onToggleLiked(id) {
    this.setState(({data}) => {
        const index = data.findIndex( elem => elem.id === id);

        const old = data[index];
        const newItem = {...old, like: !old.like};

        const newArr = [...data.slice(0, index),newItem ,...data.slice(index + 1)];
      return {
        data : newArr
      }
    })
  }
  onUpdateSearch(term){
    this.setState({term})
  }
  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like)
    } else  {
      return  items
    }
  }
  onFilterSelect(filter) {
    this.setState({filter})
  }

 render() {
    const {data, term, filter} = this.state;
    const liked = data.filter( item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <Appblock>
        <AppHeader
             liked = {liked}
             allPosts = {allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
           onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList posts={visiblePosts}
                  onDelete={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleLiked = {this.onToggleLiked}/>
        <PostAddForm onAdd={this.addItem}/>
      </Appblock>
    )
  }
}
