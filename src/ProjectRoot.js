import React, {Component} from "react";
import HomePage from "./Pages/HomePage/HomePage";
import MapDashBoard from "./Pages/MapDashBoard/MapDashBoard";
import HeaderBar from "./Components/Navigation/HeaderBar/HeaderBar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

class ProjectRoot extends Component {
	constructor() {
		super();
		this.state = { loggedIn: false }
	}

	render() {
		return (
			<React.Fragment>
				<header>
					<HeaderBar/>
				</header>
				<Switch>
					<Route exact path={"/"} component={HomePage} />
					<Route path={"/map/"} component={MapDashBoard} />
					<Redirect from='*' to='/' />
				</Switch>
			</React.Fragment>
		);
	}
}
export default withRouter(ProjectRoot);