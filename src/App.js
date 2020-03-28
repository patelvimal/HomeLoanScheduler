import React,{Component} from 'react';
import LoanForm from './components/form/LoanForm';
import LoanReport from './components/report/LoanReport';

import './assets/App.scss';

export default class App extends Component {

	constructor() {
		super();
		this.state = {

		};
	}


	onFormSubmit = (loanDetails) => {
		console.log(loanDetails);
	}

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<LoanForm onSubmit={this.onFormSubmit} />
				</div>
				<div className="">
					{/* <LoanReport /> */}
				</div>
			</React.Fragment >
		)
	}

}
