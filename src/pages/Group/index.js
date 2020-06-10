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
import { Item } from 'devextreme-react/form';
import { Template } from 'devextreme-react/core/template';
import CustomStore from 'devextreme/data/custom_store';
import DataStore from 'devextreme/data/data_source';
import { isNotEmpty, dxGridFilter } from '../../helpers/gridFilter'
import { getMasterGroupServices } from '../../helpers/master/group'

//Reducer
import {
  getMasterGroup,
  getMasterGroupSuccess,
  saveMasterGroup,
  saveMasterGroupSuccess,
  deleteMasterGroup,
  deleteMasterGroupSuccess
} from "../../store/business/master-group/actions";

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
      insert: (values) => { this.props.saveMasterGroup(values) },
      remove: (values) => { this.props.deleteMasterGroup(values) }
    })
  }

  navigateToEdit = (val) => {
    const data = val.row.data
    this.props.history.push({
      pathname: '/user-edit',
      params: data,
    });
  }

  navigateToDetail = (val) => {
    const data = val.row.data
    this.props.history.push({
      pathname: '/user-detail',
      params: data,
    });
  }

  onRowClick = (e) => {
    console.log('row', e)
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
                    <Link to="#">Veltrix</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">User</Link>
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
                  >
                    <FilterRow visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />

                    <Column dataField="id" visible={false} />
                    <Column dataField="unit_id" />
                    <Column dataField="group_code" />
                    <Column dataField="group_name" />
                    <Column dataField="active" />
                    <Column dataField="created_at" visible={false} />
                    <Column dataField="created_by" visible={false} />
                    <Column dataField="modified_at" visible={false} />
                    <Column dataField="modified_by" visible={false} />
                    <Column type="buttons"
                      buttons={[{
                        hint: 'Edit',
                        text: 'Edit',
                        onClick: this.navigateToEdit
                      }, {
                        hint: 'Detail',
                        text: 'Detail',
                        onClick: this.navigateToDetail
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
  const { error, loading, data, totalCount } = state.MasterGroup;
  return { error, loading, data, totalCount };
};

export default withRouter(connect(mapStatetoProps, {
  getMasterGroup,
  getMasterGroupSuccess,
  saveMasterGroup,
  saveMasterGroupSuccess,
  deleteMasterGroup,
  deleteMasterGroupSuccess
})(Group));