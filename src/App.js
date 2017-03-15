import React from 'react';
import Question from './components/Question';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					{/*<h2>React Quiz</h2>*/}
				</div>
				<Question content="Loan Type?" />
			</div>
		);
	}
}

export default App;
