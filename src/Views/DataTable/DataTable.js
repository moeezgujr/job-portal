// DataTable.js
import React, { Component } from "react";
import "../../Components/DataTable.css";
import { withRouter } from "react-router-dom";
import Table from "../../Components/Table";
import { getUsers } from "../../service/api";
import { LocalStorageService } from "../../service/localstorge";
import { toast } from "react-toastify";

const data = [
  { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
  // Add more data rows...
];
class DataTable extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    getUsers().then((res) => {
      console.log(res.data);
      // this.setState({users:res.data})
    });
    const storedUsers = LocalStorageService.getItem("job_portal_users") || [];
    this.setState({ users: storedUsers });
  }
  navigateToWizard = () => {
    const { history } = this.props;
    history.push("/wizard"); // Replace '/wizard' with the actual path of your Multi-Step Wizard component
  };
  handleDelete = (row) => {
    const filterUsers = this.state.users.filter((item) => item !== row);
    LocalStorageService.setItem("job_portal_users", filterUsers);
    this.setState({ users: filterUsers });
    toast.success("Job has been deleted successfully");

    // Handle delete action
    console.log("Delete:", row);
  };

  handleEdit = (row) => {
    LocalStorageService.setItem("selected_job_portal_user", row);
    this.props.history.push("/edit_wizard");
    // Handle edit action
    console.log("Edit:", row);
  };

  render() {
    const {
      jobs,
      filter,
      onFilterChange,
      // onAddClick,
      onEditClick,
      onDeleteClick,
    } = this.props;

    return (
      <div className="wizard-container">
        <div className="header-container">
          <button className="add-job-btn" onClick={this.navigateToWizard}>
            Add Job
          </button>
          <div className="notification-bell">
            {/* <FontAwesomeIcon icon={faBell} /> */}
          </div>
        </div>

        <h1>Job Portal List</h1>
        <Table
          data={this.state.users}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default withRouter(DataTable);
