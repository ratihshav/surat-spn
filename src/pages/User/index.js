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

//Reducer
import {
  getMasterUser,
  getMasterUserSuccess,
  saveMasterUser,
  saveMasterUserSuccess,
  deleteMasterUser,
  deleteMasterUserSuccess
} from "../../store/business/master-user/actions";
import toast from '../UI/toast';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
      totalCount: 0
    };
  }

  cLoad = () => {
    return new DataStore({
      load: (loadOptions) => {
        let params = '?';
        [
          'skip',
          'sort',
          'take',
          'order',
          'filter'
        ].forEach(function (i) {

          if (i in loadOptions && isNotEmpty(loadOptions[i]) && i == 'filter') {
            let filterCol = dxGridFilter(loadOptions.filter);
            params += `${i}=${JSON.stringify(filterCol)}&`;
          }
          else if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
        });
        params = params.slice(0, -1);
        return getMasterUserServices(params)
      },
      remove: (values) => { this.onDeleteUser(values) }
    })
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

  /* navigate to detail user */
  // navigateToDetail = (val) => {
  //   const data = val.row.data
  //   this.props.history.push({
  //     pathname: '/user-detail',
  //     params: data,
  //   });
  // }

  onRowClick = (e) => {
    console.log('row', e)
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
      .catch(() => {
        this.alertError()
      });
  }

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = () => {
    toast.error('Gagal Menghapus data')
  }

  render() {
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
                  <DataGrid
                    dataSource={this.cLoad()}
                    remoteOperations={true}
                    rowAlternationEnabled={true}
                    showColumnLines={false}
                    columnAutoWidth={true}
                    onRowClick={this.onRowClick}
                    onToolbarPreparing={this.onToolbarPreparing}
                  >
                    <Editing
                      mode="row"
                      allowDeleting={true} />
                    <FilterRow visible={true} />

                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />

                    <Column dataField="id" visible={false} />
                    <Column dataField="password" visible={false} />
                    <Column dataField="confirm_password" visible={false} />
                    <Column dataField="full_name" />
                    <Column dataField="username" />
                    <Column dataField="email" />
                    <Column dataField="group_name" visible={false} />
                    <Column dataField="address" visible={false} />
                    <Column dataField="phone" visible={false} />
                    <Column dataField="last_login" visible={false} />
                    <Column dataField="created_at" visible={false} />
                    <Column dataField="created_by" visible={false} />
                    <Column dataField="modified_at" visible={false} />
                    <Column dataField="modified_by" visible={false} />
                    <Column type="buttons"
                      buttons={[{
                        hint: 'Edit',
                        text: 'Edit',
                        onClick: this.navigateToEdit
                      }, 'delete']}
                    />

                  </DataGrid>
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
  const { error, loading, data, totalCount } = state.MasterUser;
  return { error, loading, data, totalCount };
};

export default withRouter(connect(mapStatetoProps, {
  getMasterUser,
  getMasterUserSuccess,
  saveMasterUser,
  saveMasterUserSuccess,
  deleteMasterUser,
  deleteMasterUserSuccess
})(User));