import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	// componentWillReceiveProps(nextProps) {
	//     this.setState({
	//       brokenLinks: nextProps.brokenLinks
	//     });
	// }

	render () {
		var links = this.props.brokenLinks;

		return ( <div id="list">
    <tr>
    	<th>Website</th>
    	<th>Broken Link</th>
    	<th>Scraped</th>
    </tr>
    {links.map(item => <ListItem item={item}/>)}
  </div>)
	}
}

export default List;