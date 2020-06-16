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
  Paging,
  FilterRow,
  Pager,
} from 'devextreme-react/data-grid';
import DataStore from 'devextreme/data/data_source';
import { isNotEmpty, dxGridFilter } from '../../helpers/gridFilter'
import { getOutgoingMailService } from '../../helpers/master/mail'

//Reducer
import {
  getOutgoingMail,
  getOutgoingMailSuccess,
  deleteOutgoingMail,
  deleteOutgoingMailSuccess
} from "../../store/business/outgoing-mail/actions";


const subjectMail = (cellData) => {
  return (
    <div>
      <p>{cellData.hal_surat}</p><br />
      <p>{cellData.group_name}</p><br />
      <p>{cellData.status - cellData.position_name}</p>
    </div>
  )
}
class OutgoingMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
      totalCount: 0
    };
  }

  componentDidMount() {
    this.getDataMail()
  }

  getDataMail = () => {
    this.props.getOutgoingMail()
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
        return getOutgoingMailService(params)
      },
      remove: (values) => { this.props.deleteOutgoingMail(values) }
    })
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/outgoing-mail-create'
    });
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
    localStorage.setItem('idMail', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/outgoing-mail-detail',
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

  getSubjectMail = (rowData) => {
    return (
      rowData.status + "-" + rowData.position_name + "-" + rowData.group_name
    )
  }


  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat Keluar</Link>
                  </li>
                  <li className="breadcrumb-item active">Surat Keluar</li>
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
                    <FilterRow visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />

                    <Column dataField="disposisi_id" visible={false} />
                    <Column dataField="nomor_agenda" />
                    <Column dataField="nomor_surat" />
                    <Column dataField="tgl_surat" />
                    <Column dataField="jenis_surat" />
                    <Column dataField="tujuan_surat" />
                    <Column caption="Hal" dataField="hal_surat" calculateDisplayValue={this.getSubjectMail} />
                    <Column dataField="group_name" visible={false} />
                    <Column dataField="id" visible={false} />
                    <Column dataField="is_editable" visible={false} />
                    <Column dataField="position_name" visible={false} />
                    <Column dataField="status" visible={false} />
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
  const { error, loading, data, totalCount } = state.OutgoingMail;
  return { error, loading, data, totalCount };
};

export default withRouter(connect(mapStatetoProps, {
  getOutgoingMail,
  getOutgoingMailSuccess,
  deleteOutgoingMail,
  deleteOutgoingMailSuccess
})(OutgoingMail));
