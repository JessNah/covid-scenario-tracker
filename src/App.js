import React from 'react';
import { HashRouter } from "react-router-dom";
import './App.scss';
import ProjectRoot from "./ProjectRoot";


function App() {
	return (
		<div className="App">
			<HashRouter>
				<ProjectRoot/>
			</HashRouter>
		</div>
	);
}

export default App;