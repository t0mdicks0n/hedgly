import React from 'react';
import ReactDOM from 'react-dom';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				url: ''
		}
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			url: e.target.value
		});
	}

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.url);
  }

	render () {
		return (<div id="input">
		  <form onSubmit={this.handleSubmit}>
			  Scrape website for broken links: <br/>
			  <input type="text" value={this.state.url} onChange={this.onChange} />
			  <input type="submit" value="Submit" />
		  </form>
		</div>)
	}
}

export default Input;