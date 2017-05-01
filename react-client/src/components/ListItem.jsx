import React from 'react';

const ListItem = (props) => (
	<tr>
		<td>{ props.item.website }</td>
		<td>
			<a href={props.item.link}>Link</a>
		</td>
		<td>{ props.item.created_at }</td>
	</tr>
)

export default ListItem;