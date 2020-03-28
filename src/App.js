import React,{Component} from 'react';
import LoanForm from './components/form/LoanForm';
import LoanReport from './components/report/LoanReport';

import './assets/App.scss';

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			showResult:false
		};
	}

	onFormSubmit = (loanDetails) => {
		console.log(loanDetails);
		this.setState({
			showResult:true
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<LoanForm onSubmit={this.onFormSubmit} />
				</div>
				<div className="">
					{this.state.showResult ? <LoanReport /> : null}
				</div>
			</React.Fragment >
		)
	}

}
