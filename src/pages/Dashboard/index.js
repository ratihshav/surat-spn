import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import images
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import { getDashboardDataService } from '../../helpers/master/dashboard'

import "chartist/dist/scss/chartist.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDashboard: []
    };
  }

  componentDidMount() {
    this.notifOneSignal()
    this.getDataDashboard()
  }

  getDataDashboard = () => {
    getDashboardDataService()
      .then((data) => {
        this.setState({
          dataDashboard: data
        })
      })
      .catch((e) => {
        // this.alertError(e)
      });
  }

  notifOneSignal = () => {
    const { email } = this.props.data
    console.log('email', email)
    var useragentid = null;
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
      appId: "b867ffe2-3c0d-4b41-9522-9e120321f5cd",
      autoRegister: false,
      notifyButton: {
        enable: false
      },
      persistNotification: false
    }]);
    //Firstly this will check user id 
    OneSignal.push(function () {
      OneSignal.getUserId().then(function (userId) {
        if (userId == null) {
          console.log("OneSignal User ID:", userId);
        }
        else {
          useragentid = userId;
          console.log('useragentid', useragentid)

          OneSignal.push(["getNotificationPermission", function (permission) {
          }]);
          OneSignal.isPushNotificationsEnabled(function (isEnabled) {
            if (isEnabled) {
              console.log("Push notifications are enabled!");
            }
            else {
              console.log("Push notifications are not enabled yet.");
            }
          });
        }
      });
    });
    //Secondly this will check when subscription changed
    OneSignal.push(function () {
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed == true) {
          OneSignal.getUserId().then(function (userId) {
            useragentid = userId;
          }).then(function () {
            // this is custom function
            // here you can send post request to php file as well.
            // OneSignalUserSubscription(useragentid);
            console.log('useragentid', useragentid)
          });
        }
        else if (isSubscribed == false) {
          OneSignal.getUserId().then(function (userId) {
            useragentid = userId;
          });
        }
        else {
          console.log('Unable to process the request');
        }
      });
    });
    OneSignal.push(function () {
      OneSignal.sendTag("email", email);
    });
    function subscribeOneSignal() {
      if (useragentid != null) {
        OneSignal.setSubscription(true);
      }
      else {
        OneSignal.registerForPushNotifications({
          modalPrompt: true
        });
      }
    }
    function unSubscribeOneSignal() {
      OneSignal.setSubscription(false);
    }
  }

  render() {
    const { username } = this.props.data
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Dashboard</h4>
                <ol className="breadcrumb mb-0">
                </ol>
              </div>
            </Col>
          </Row> */}

          <Row>
            <Col>
              <br />
              <div className="card text-white bg-info">
                <div className="card-body" style={{ backgroundColor: '#2A9D8F', borderRadius: 5 }}>
                  <blockquote className="card-blockquote mb-0">
                    <h3>
                      Selamat Datang, {username}!
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
                  <div className="table-responsive">
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
                        <tr>
                          <th scope="row">Surat Masuk</th>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle mr-2"
                              />{" "}
                              Philip Smead
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-success">
                              Delivered
                            </span>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
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
