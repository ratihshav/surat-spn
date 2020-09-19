import React, { Component } from "react";
import {
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import DataGrid, {
  Column,
  Editing,
  Paging,
  FilterRow,
  Pager,
} from 'devextreme-react/data-grid';
import DataStore from 'devextreme/data/data_source';
import { isNotEmpty, dxGridFilter } from '../../helpers/gridFilter'
import { getMasterUserServices, deleteMasterUserService } from '../../helpers/master/user'
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';

//Reducer
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';

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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
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

  render() {
    const { perms } = this.props.data
    const { dataUser } = this.state
    const granted = ['user_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));

    console.log('dataUser', dataUser)

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
                    data={dataUser}
                    expandableRows={true}
                    expandOnRowClicked={true}
                    pagination={true}
                    highlightOnHover={true}
                    striped={true}
                    dense={true}
                    noHeader={true}
                    subHeader={true}
                    subHeaderComponent={
                      (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ margin: '5px' }} /> */}
                          {/* <Icon1 style={{ margin: '5px' }} color="action" />
                          <Icon2 style={{ margin: '5px' }} color="action" />
                          <Icon3 style={{ margin: '5px' }} color="action" /> */}
                        </div>
                      )
                    }
                    subHeaderAlign={"right"}
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