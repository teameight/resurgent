import React from 'react';

class AddAreaForm extends React.Component {
	createArea(e) {
		e.preventDefault();
		console.log('add an area');
		const area = {
			name: this.name.value
		}
		console.log(area);
		this.props.addNewArea(area);
		this.areaForm.reset();
	}

	render() {
		return (
			<form ref={(input) => this.areaForm = input} className="add-area" onSubmit={(e) => this.createArea(e)}>
				<input ref={(input) => this.name = input} type="text" placeholder="Area Name" />
				<button type="submit">Add Area</button>
			</form>
		)
	}
}

export default AddAreaForm;