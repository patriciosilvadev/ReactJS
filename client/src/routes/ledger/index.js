/**
 * Auther : Tejas
 * Created : 29/10/2018
 * My Ledger Component
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Form, Label, Input,Row,Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

// import section loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// import neccessary actions
import { 
	myLedger,
} from 'Actions/TradingReport';

import {getCurrencyList} from "Actions/Trade";

import { NotificationManager } from 'react-notifications';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// import ex data tables for display table 
import ExDatatable from './components/ex_datatable';

// intl messages means convert text into selected languages
import IntlMessages from 'Util/IntlMessages';


// define My ledger component
class Ledger extends Component {

	// make default state values on load
	constructor(props) {
		super();
		this.state = {
			start_date: new Date().toISOString().slice(0, 10),
			end_date: new Date().toISOString().slice(0, 10),
			currentDate : new Date().toISOString().slice(0, 10),
            pair : 'all',
            WalletId:'',
			status : '',
			type:0,
			onLoad : 0,
			getLedgerData:0
		}
		
		this.onGetLedgerData = this.onGetLedgerData.bind(this);		
		this.handleChange = this.handleChange.bind(this);		
	}

	onGetLedgerData(event) {
        event.preventDefault();
        const data ={
            FromDate:this.state.start_date,
            ToDate:this.state.end_date,
            WalletId:this.state.WalletId
        }
        if(this.state.start_date === ''){
            NotificationManager.error(<IntlMessages id="trading.openorders.selectstartdate" />);
        }else if(this.state.end_date === ''){
			NotificationManager.error(<IntlMessages id="trading.openorders.selectenddate" />);
		}else if((this.state.start_date !== '' && this.state.end_date == '') || (this.state.end_date !== '' && this.state.start_date == '')){
			
			NotificationManager.error(<IntlMessages id="trading.openorders.dateselect" />);
		}else if(this.state.end_date < this.state.start_date){			

			NotificationManager.error(<IntlMessages id="trading.openorders.datediff" />);
		}else if(this.state.end_date > this.state.currentDate){

			NotificationManager.error(<IntlMessages id="trading.openorders.endcurrentdate" />);
		}else if(this.state.start_date > this.state.currentDate){

			NotificationManager.error(<IntlMessages id="trading.openorders.startcurrentdate" />);
		}else if(this.state.WalletId === ''){
			NotificationManager.error(<IntlMessages id="trading.openorders.selectwalletid" />);
		}else{
			this.setState({getLedgerData:1})
            this.props.myLedger(data)
        }
	}

	// used to handle change event of every input field and set values in states
	handleChange(event) {
		if(event.target.value <= this.state.currentDate){
			this.setState({ [event.target.name]: event.target.value });
		}else{
			NotificationManager.error(<IntlMessages id="trading.openorders.properdate" />)
		}	
	}

    handleChangeUser = (event) =>{
        this.setState({
            WalletId:event.target.value
        })
	}
	
	componentWillMount() {
		//console.log('componentWillMount');
		this.props.getCurrencyList()
	}
	
	componentWillReceiveProps(nextprops){

		if(nextprops.errorCode !== 0 && this.state.getLedgerData){
			if(typeof nextprops.errorCode !== 'undefined' && nextprops.errorCode == 4033) {
				NotificationManager.error(<IntlMessages id="error.trading.transaction.4501" />);
			}
			this.setState({showLoader:false,getLedgerData:0})
		}

	}
	render() {
		const walletId = []
		if(this.props.wallets){
			this.props.wallets.map((value,key)=>{					
				walletId.push({"walletId":value.AccWalletID,"walletName":value.CoinName})
			})
		}

		
		const data = this.props.myLedgerList;

		// define options for data tables
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked',
			selectableRows: false,
			filter: false,
			textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />
                }
            },
        };
        // define columns for data tables
		const columns = [
			{
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.ledgerid"} />
			},
			{
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.amount"} />
			},
			{
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.cramount"} />
			},
			{
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.dramount"} />
			}, {
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.prebalance"} />

			}, {
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.postbalance"} />

			}, {
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.remarks"} />

			}, {
				name: <IntlMessages id={"sidebar.myLedger.tableHeading.date"} />
			}
		];
			
		return (
			<Fragment>
				{ this.props.loading &&
					<JbsSectionLoader />
				}
				<div className="charts-widgets-wrapper">
					<PageTitleBar title={<IntlMessages id="sidebar.ledger" />} match={this.props.match} />
					<div className="transaction-history-detail">
					  <JbsCollapsibleCard>
					  	<Row>
							<Col md={12}>
								<div className="top-filter clearfix mb-10 transaction-search">
									<Form name="frm_search">
									<Row>
										<Col md={3}>
											<Label for="startDate1">{<IntlMessages id="sidebar.tradingLedger.filterLabel.startDate" />}</Label>
											<Input type="date" name="start_date" value={this.state.start_date} id="startDate1" placeholder="dd/mm/yyyy" onChange={this.handleChange} />
										</Col>
										<Col md={3}>
											<Label for="endDate1">{<IntlMessages id="sidebar.tradingLedger.filterLabel.endDate" />}</Label>
											<Input type="date" name="end_date" value={this.state.end_date} id="endDate1" placeholder="dd/mm/yyyy" onChange={this.handleChange} />
										</Col>
										<Col md={3}>
											<Label for="Select-2">{<IntlMessages id="siderbar.ledger.lable.walletid" />}</Label>
											<div className="app-selectbox-sm">
												<Input type="select" name="type" value={this.state.WalletId} id="Select-2" onChange={this.handleChangeUser}>
												<IntlMessages id="transactioncharge.report.filter.option.label.select">
													{ (labelSelect) =>
														<option value="all">{labelSelect}</option>
													}
												</IntlMessages>
													{
														walletId.map((type,key)=>
															<option value={type.walletId} key={key} >{type.walletName}</option>
														)
													}
												</Input>
											</div>
										</Col>																		
										<Col md={3}>
											<Label className="d-block">&nbsp;</Label>
											<Button onClick={this.onGetLedgerData} color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="sidebar.tradingLedger.button.apply" /></Button>
										</Col>
                                        </Row>
									</Form>
								</div>
							</Col>
						</Row>
						</JbsCollapsibleCard>
						<ExDatatable 
                            title="sidebar.tradingLedger.list"
                            data={data}
							data={data.map(item => {								
								return [
									item.LedgerId,
									item.Amount,
									item.CrAmount,
                                    item.DrAmount,
                                    item.PreBal,
                                    item.PostBal,																										
									item.Remarks,
									item.TrnDate.replace('T',' ').split('.')[0]
									
								]
							})}
							columns={columns}
							options={options}
							darkMode={this.props.darkMode}
						/>						
					</div>
				</div>
			</Fragment>
		);
	}
}

// map states to props when changed in states from reducer
const mapStateToProps = ({ myLedger ,currency, settings }) => {
	const { darkMode } = settings;
	const {wallets} = currency
	const { myLedgerList, loading,errorCode } = myLedger;
	return { myLedgerList,wallets, loading , darkMode,errorCode }
}
  
// export this component with action methods and props
export default connect(mapStateToProps, { myLedger,getCurrencyList })(Ledger);
