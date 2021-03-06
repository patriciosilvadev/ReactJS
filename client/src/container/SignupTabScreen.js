/**
 * Auther : Salim Deraiya
 * Created : 10/10/2018
 * SignUp Screen
 */

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
// intl messages
import IntlMessages from "Util/IntlMessages";
//Tab
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// app config
import AppConfig from 'Constants/AppConfig';
//Registration Form
import { NormalRegistrationWdgt } from 'Components/MyAccount';
import { SignupEmailWithOTPWdgt } from 'Components/MyAccount';
import { SignupMobileWithOTPWdgt } from 'Components/MyAccount';


class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }
    
    handleChange(event, value) {
        this.setState({ activeIndex: value });
    }

	render() {
        const { activeIndex } = this.state;
        const { loading } = this.props;
		return (
			<QueueAnim type="bottom" duration={2000}>
				<div className="jbs-session-wrapper">
					{loading &&
						<LinearProgress />
					}
					<AppBar position="static" className="session-header">
						<Toolbar>
							<div className="container">
								<div className="d-flex justify-content-between">
									<div className="session-logo">
										<Link to="/">
											<img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
										</Link>
									</div>
									<div>
										<Link to="/signin" className="mr-15 text-white"><IntlMessages id="my_account.alreadyHaveAnAccount" /></Link>
										<Button
											component={Link}
											to="/signin"
											variant="raised"
											className="btn-light"
										>
											<IntlMessages id="my_account.signIn" />
										</Button>
									</div>
								</div>
							</div>
						</Toolbar>
					</AppBar>
					<div className="session-inner-wrapper">
						<div className="container">
							<div className="row row-eq-height">
								<div className="col-sm-12 col-md-8 col-lg-8 mx-auto">
									<div className="session-body text-center">
										<div className="session-head mb-30">
											<h2 className="font-weight-bold"><IntlMessages id="my_account.getStartedWith" /> {AppConfig.brandName}</h2>
										</div>
                                        <div className="tab_area">
                                            <Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} fullWidth indicatorColor="primary" textColor="primary">
                                            <Tab label={<IntlMessages id="sidebar.normalSignup" />} className="cstm_tab" />
                                            <Tab label={<IntlMessages id="sidebar.signupWithEmail" />} className="cstm_tab" />
                                            <Tab label={<IntlMessages id="sidebar.signupWithMobile" />} className="cstm_tab" />
                                            </Tabs>
                                            <div className="tab_container">
                                                {activeIndex === 0 && <NormalRegistrationWdgt />}
                                                {activeIndex === 1 && <SignupEmailWithOTPWdgt />}
                                                {activeIndex === 2 && <SignupMobileWithOTPWdgt />}
                                            </div>
                                        </div>
										<p className="text-muted"><IntlMessages id="my_account.bySigningnote" /> {AppConfig.brandName}</p>
										<p><Link target="_blank" to="/terms-of-service" className="text-muted"><IntlMessages id="sidebar.termsOfService" /></Link></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</QueueAnim>
		);
	}
}

export default SignUpScreen;