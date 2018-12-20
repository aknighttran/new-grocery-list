import React, { Component } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { Container, Header } from 'semantic-ui-react'
import axios from "axios";

class App extends Component {
  state = { items: [], }

  componentDidMount() {
    axios.get('/api/items')
      .then( res => {
        this.setState({ items: res.data, })
      })
      .catch( err => {
        console.log(err);
      })
  }

  addItem = (name, price) => {
    axios.post('/api/items', { name, price })
      .then(res => {
        const { items } = this.state;
        this.setState({ items: [...items, res.data] });
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateItem = (id) => {
    axios.put(`/api/items/${id}`)
      .then( res => {
        const items = this.state.todos.map( t => {
          if (t.id === id)
            return res.data;
          return t;
        });
        this.setState({ items });
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteItem = (id) => {
    axios.delete(`/api/items/${id}`)
    .then( res => {
      const { items } = this.state;
      this.setState({ items: items.filter(t => t.id !== id) })
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    return (
      <Container style={{ padding: "30 px 0" }}>
        <Header textAlign='center' style={{'fontSize': '50px'}}>GROCERY LIST</Header>
        <ItemForm addItem={this.addItem} />
        <br />
        <br />
        <ItemList 
          items={this.state.items}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
        />
      </Container>
    );
  }
}

export default App;
