import React, {useEffect } from "react";
import "./helper/i18n";
import {render} from "react-dom";
import { BrowserRouter, Routes , useNavigate, useLocation, Route,Navigate} from 'react-router-dom';

import { ReactNotifications } from 'react-notifications-component';

import MasterLayout from "./view/layout/master/masterLayout";

import HomeViewController from "./viewController/home/homeViewController";

require('bootstrap/dist/css/bootstrap.min.css');
require("./assets/css/dir-ltr.scss");
require("./assets/css/dir-rtl.scss");
require("./assets/css/theme.scss");
require("./assets/css/global.scss");
require('react-notifications-component/dist/theme.css');

function App() 
{
	
	const history = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Runs ONCE after initial rendering

	}, []);

	return (
		<MasterLayout history={history} location={location}>
			

			<Routes>
				<Route path='/home' element={<HomeViewController history={history}/>} />
				<Route path="/" element={<Navigate to="/home"/>}/>


			</Routes>
		</MasterLayout>
	)
}

export default render(
	<BrowserRouter>
		<ReactNotifications />
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);