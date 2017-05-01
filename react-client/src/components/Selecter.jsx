import React from 'react';
import SelectItem from './SelectItem.jsx';

class Selecter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: ['test']
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        websites: nextProps.websites
      });
  }

  render () {
    return ( <div id="select">
      <div>Choose a already scraped website:</div> 
      <select id="dropdown" onChange={this.handleChange}>
        { this.state.websites.map(item => <SelectItem item={item}/>)}
      </select>
  </div>)
  }
}

export default Selecter;