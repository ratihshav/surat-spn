import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";

import "chartist/dist/scss/chartist.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Dashboard</h4>
                <ol className="breadcrumb mb-0">
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-left mini-stat-img mr-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Surat Masuk
                    </h5>
                    <h4 className="font-weight-medium font-size-24">
                      1,685{" "}
                      <i className="mdi mdi-arrow-up text-success ml-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-right">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-left mini-stat-img mr-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Surat Keluar
                    </h5>
                    <h4 className="font-weight-medium font-size-24">
                      52,368{" "}
                      <i className="mdi mdi-arrow-down text-danger ml-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-danger">
                      <p className="mb-0">- 28%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-right">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-left mini-stat-img mr-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Asistensi
                    </h5>
                    <h4 className="font-weight-medium font-size-24">
                      15.8{" "}
                      <i className="mdi mdi-arrow-up text-success ml-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-right">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-left mini-stat-img mr-4">
                      <img src={servicesIcon4} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Tugas
                    </h5>
                    <h4 className="font-weight-medium font-size-24">
                      2436{" "}
                      <i className="mdi mdi-arrow-up text-success ml-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-warning">
                      <p className="mb-0">+ 84%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-right">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
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
