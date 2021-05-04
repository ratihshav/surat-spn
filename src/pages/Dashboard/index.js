import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import images
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import { getDashboardDataService } from '../../helpers/master/dashboard'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDashboard: []
    };
  }

  componentDidMount() {
    this.getDataDashboard()
  }

  getDataDashboard = () => {
    getDashboardDataService()
      .then((data) => {
        this.setState({
          dataDashboard: data.data
        })
      })
      .catch((e) => {
        // this.alertError(e)
      });
  }

  getTableContent = (data) => {
    return (

      <table className="table table-hover table-centered table-nowrap mb-0">
        <thead>
          <tr>
            <th scope="col">Tipe Surat</th>
            <th scope="col">Surat</th>
            <th scope="col">
              Status
                          </th>
          </tr>
        </thead>
        <tbody>
          {data ? data.map(function (item, index) {
            return (
              <tr key={index}>
                <th scope="row">{item.tipe_surat}</th>
                <td>
                  <div>
                    {item.hal_surat}
                    <br />
                    {item.tujuan_surat}
                    <br />
                    {item.nomor_surat}
                    <br />
                    {item.tgl_surat}
                  </div>
                </td>
                <td>
                  <div className="badge badge-success">
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>{item.status_surat}</div>
                  </div>
                </td>
              </tr>

            );
          }) : null}
        </tbody>
      </table>

    )
  }

  render() {
    const { full_name } = this.props.data
    const { dataDashboard } = this.state

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row>
            <Col>
              <br />
              <div className="card text-white bg-info">
                <div className="card-body" style={{ backgroundColor: '#2A9D8F', borderRadius: 5 }}>
                  <blockquote className="card-blockquote mb-0">
                    <h3>
                      Selamat Datang, {full_name}!
                    </h3>
                  </blockquote>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h3>
                    TUGAS
                    </h3>
                  <br />
                  {dataDashboard.length !== 0 ?
                    <div className="table-responsive">
                      {this.getTableContent(dataDashboard)}
                    </div>
                    : <Row className="justify-content-center">Tidak ada tugas baru</Row>
                  }
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
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Dashboard));
