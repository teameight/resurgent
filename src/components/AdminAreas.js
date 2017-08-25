import React from 'react';
import AddAreaForm from './AddAreaForm';

class AdminAreas extends React.Component {

  constructor() {
    super();

    this.addNewArea = this.addNewArea.bind(this);
  }

  addNewArea(area) {
    //update our state
    const areas = this.props.areas;
    // add new area
    const timestamp = Date.now();
    areas[`area-${timestamp}`] = area;
    // set state
    this.setState({ areas: areas });
  }

  render() {
    return (
      <div className="admin-areas">
        <h2>Admin Areas</h2>
        <AddAreaForm addNewArea={this.addNewArea} />
      </div>
    )
  }
}

export default AdminAreas;