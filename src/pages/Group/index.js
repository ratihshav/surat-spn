import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  FilterRow,
  Lookup,
  Pager,
  Position,
  Form
} from 'devextreme-react/data-grid';
import DataStore from 'devextreme/data/data_source';
import { isNotEmpty, dxGridFilter } from '../../helpers/gridFilter'
import { getMasterGroupServices, deleteMasterGroupService } from '../../helpers/master/group'
import toast from '../UI/toast';

class Group extends Component {
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
        return getMasterGroupServices()
      },
      remove: (values) => { this.onDeleteGroup(values) }
    })
  }

  onDeleteGroup = (values) => {
    deleteMasterGroupService(values)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/group');
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
    localStorage.setItem('idDivisi', JSON.stringify(data.id))
    console.log(JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/group-edit',
      params: data,
    });
  }

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

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/group-add'
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Master Unit</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Divisi</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Divisi</li>
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
                    // remoteOperations={true}
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
                    <Column dataField="group_code" />
                    <Column dataField="group_name" />
                    {/* <Column dataField="created_at" visible={false} />
                    <Column dataField="created_by" visible={false} />
                    <Column dataField="modified_at" visible={false} />
                    <Column dataField="modified_by" visible={false} /> */}
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

export default withRouter(connect()(Group));
