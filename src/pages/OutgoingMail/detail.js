import React, { Component } from "react";
import SettingMenu from "../Shared/SettingMenu";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  getDetailOutgoingMail
} from "../../store/business/outgoing-mail/actions";

import { getDetailOutgoingMailService } from "../../helpers/master/mail"

class OutgoingMailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailList: ''
    };
  }

  componentDidMount() {
    this.getDataUser()
  }

  getDataUser = () => {
    const id = this.props.location.params.id

    getDetailOutgoingMailService(id)
      .then((data) => {
        this.setState({ detailList: data.data.data })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }



  getTableContent = (data) => {
    return (
      <table className="table mb-0">
        <tr>
          <th>
            <tr>
              <th>Dikonsep Oleh:</th>
              <td>{data.created_by}</td>
            </tr>
            <tr>
              <th>Perihal:</th>
              <td>{data.hal_surat}</td>
            </tr>
            <tr>
              <th>Kepada:</th>
              <td>{data.to_username}</td>
            </tr>
            <tr>
              <th>Jenis Surat:</th>
              <td>{data.jenis_surat}</td>
            </tr>
            <tr>
              <th>Klasifikasi Surat:</th>
              <td>{data.klasifikasi_surat}</td>
            </tr>
            <tr>
              <th>Sifat Surat:</th>
              <td>{data.sifat_surat}</td>
            </tr>
            <tr>
              <th>Nomor Agenda:</th>
              <td>{data.nomor_agenda}</td>
            </tr>
            <tr>
              <th>Nomor Surat:</th>
              <td>{data.nomor_surat}</td>
            </tr>
            <tr>
              <th>Tanggal Surat:</th>
              <td>{data.tgl_surat}</td>
            </tr>
            <tr>
              <th>Lampiran:</th>
              <td>{data.lampiran}</td>
            </tr>
            <tr>
              <th>Tujuan Surat:</th>
              <td>{data.tujuan_surat}</td>
            </tr>
          </th>
          <th>
            <tr>
              {/* {data.disposisi.map(function (nextItem, j) {
                return (
                  <tr key={nextItem.id}>
                    <td>{nextItem.tujuan_username}</td>
                  </tr>
                );
              })} */}
            </tr>
          </th>
        </tr>
      </table>
    )
  }



  render() {
    const { detailList } = this.state
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Detail Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/outgoing-mail">Surat Keluar</Link>
                  </li>
                  <li className="breadcrumb-item active">Detail Surat Keluar</li>
                </ol>
              </div>
            </Col>

            <Col sm="6">
              <div className="float-right d-none d-md-block">
                <SettingMenu />
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    <div className="table-responsive">
                      {this.getTableContent(detailList)}
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.OutgoingMail;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, {
  getDetailOutgoingMail
})(OutgoingMailDetail));
