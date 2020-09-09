import React, { Component } from "react";
import {
  Row,
  Col,
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
import { getMasterPositionServices, deleteMasterPositionService } from '../../helpers/master/position'

import toast from '../UI/toast';

class Position extends Component {
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
        return getMasterPositionServices()
      },
      remove: (values) => { this.onDeletePosition(values) }
    })
  }

  onDeletePosition = (values) => {
    deleteMasterPositionService(values)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/position');
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

  navigateToEdit = (val) => {
    const data = val.row.data
    localStorage.setItem('idPosition', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/position-edit',
      params: data,
    });
  }

  navigateToPermissions = (val) => {
    const data = val.row.data
    localStorage.setItem('idPosition', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/position-permission',
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

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/position-add'
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Jabatan</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/position">Jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Jabatan</li>
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
                    rowAlternationEnabled={true}
                    showColumnLines={false}
                    columnAutoWidth={true}
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
                    <Column caption="Nama Jabatan" dataField="position_name" />
                    <Column caption="Tipe" dataField="position_type" />
                    <Column caption="Divisi" dataField="group_name" />
                    <Column type="buttons"
                      buttons={[{
                        hint: 'Edit',
                        text: 'Edit',
                        onClick: this.navigateToEdit
                      },
                      {
                        hint: 'Hak Akses',
                        text: 'Hak Akses',
                        onClick: this.navigateToPermissions
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

export default withRouter(connect()(Position));
