import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class ItemForm extends React.Component {
  state = { name: '', price: '' };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.name, this.state.price);
    this.setState({ name: '', price: '' })
  }

  render() {
    const {name, price} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input 
          name='name'
          value={name}
          required
          type='text'
          placeholder='Add Item'
          onChange={this.handleChange}        />
        <Form.Input
          name='price'
          value={price}
          required
          type='text'
          placeholder='$ - Cost'
          onChange={this.handleChange}        />
        <Button type='submit' color='black'>Submit</Button>
      </Form>
    )
  }
}

export default ItemForm;