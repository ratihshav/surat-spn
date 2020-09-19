import React, { Component } from "react";
import {
  Row,
  Col,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import { getMasterUserServices, deleteMasterUserService } from '../../helpers/master/user'
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

//Reducer
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285F4
`;

const columns = [
  {
    name: 'Nama Lengkap',
    selector: 'full_name',
    sortable: true,
  }, {
    name: 'Username',
    selector: 'username',
    sortable: true,
  }, {
    name: 'Email',
    selector: 'email',
    sortable: true,
  }, {
    name: 'Jabatan',
    selector: 'position_name',
    sortable: true,
  }, {
    name: 'Username',
    selector: 'username',
    sortable: true,
  }
]

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);

const AddButtonComponent = ({ onClick }) => {
  return (
    <Button color="success" key="add" onClick={onClick}>Tambah Data</Button>
  )
}


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterUserServices()
      .then((data) => {
        this.setState({
          dataUser: data.data.data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  alertError = (e) => {
    toast.error(e)
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/user-add'
    });
  }

  navigateToEdit = (val) => {
    const data = val.row.data
    localStorage.setItem('idUser', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/user-edit',
      params: data,
    });
  }

  onToolbarPreparing = (e) => {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        text: 'Tambah Baru',
        onClick: this.navigateToAdd
      }
    });
  }

  onDeleteUser = (values) => {
    deleteMasterUserService(values)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/user');
      })
      .catch((e) => {
        this.alertError(e)
      });
  }

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  handleClear = () => {
    const { resetPaginationToggle, filterText } = this.state;

    if (filterText) {
      this.setState({
        resetPaginationToggle: !resetPaginationToggle,
        filterText: ""
      });
    }
  };

  getSubHeaderComponent = () => {
    const { dataUser, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['user_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataUser.filter(
            (item) =>
              item.full_name &&
              item.full_name.toLowerCase().includes(newFilterText.toLowerCase())
          );
          this.setState({ filterText: newFilterText });
        }}
          onClear={this.handleClear}
          filterText={filterText}
        /> &nbsp; &nbsp;

        { isAbleCreate ?
          <AddButtonComponent
            onClick={this.navigateToAdd}
          />
          : null}
      </Row>
    );
  };

  render() {
    const { dataUser, resetPaginationToggle, filterText } = this.state

    const filteredItems = dataUser.filter(item => item.full_name && item.full_name.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar User</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/user">User</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar User</li>
                </ol>
              </div>
              <br />
            </Col>

          </Row>


          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    // expandableRows
                    // expandOnRowClicked
                    pagination
                    highlightOnHover
                    striped
                    dense
                    subHeader
                    subHeaderComponent={this.getSubHeaderComponent()}
                    paginationResetDefaultPage={resetPaginationToggle}
                  />

                </div>
              </div>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(User));