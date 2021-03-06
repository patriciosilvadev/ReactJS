/**
 * Auther : Salim Deraiya
 * Created : 11/10/2018
 * SignIn Screen
 */

import React, { Component, Fragment } from 'react';
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

//Login Form
import { NormalLoginWdgt } from 'Components/MyAccount';
import { SigninEmailWithOTPWdgt } from 'Components/MyAccount';
import { SigninMobileWithOTPWdgt } from 'Components/MyAccount';

class SignInScreen extends Component {
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
											<img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
										</Link>
									</div>
									<div>
										<Link to="/signup" className="mr-15 text-white"><IntlMessages id="my_account.createNewAccount" /></Link>
										<Button variant="raised" className="btn-light" component={Link} to="/signup"><IntlMessages id="my_account.signUp" /></Button>
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
										<Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} fullWidth indicatorColor="primary" textColor="primary">
                                            <Tab label={<IntlMessages id="sidebar.normalSignin" />} className="cstm_tab" />
                                            <Tab label={<IntlMessages id="sidebar.signinWithEmail" />} className="cstm_tab" />
                                            <Tab label={<IntlMessages id="sidebar.signinWithMobile" />} className="cstm_tab" />
                                        </Tabs>
                                        <div className="tab_container">
                                            {activeIndex === 0 && <NormalLoginWdgt />}
                                            {activeIndex === 1 && <SigninEmailWithOTPWdgt />}
                                            {activeIndex === 2 && <SigninMobileWithOTPWdgt />}
                                        </div>
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

export default SignInScreen;