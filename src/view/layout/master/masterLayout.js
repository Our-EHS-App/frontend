import View from '../../../core/view';

import {Container, Row, Col} from "reactstrap";

import SidebarMenuView from "../../component/sidebarMenu/sidebarMenuView";

import Session from "../../../helper/session";

import "./masterLayout.scss";

export default class MasterLayoutView extends View
{
	constructor(props)
	{
		super(props)
	
		this.state =
		{
			isOnline:true,
		}
    }

	

	updateInternetConnection(flag)
    {
		this._isMounted && this.setState({...this.state, isOnline:flag});
		console.log("flag",flag);

		if(flag === false)
		{
			this._isMounted && this.showErrorMsg(this.i18n('common_noInternet'), 'warning');
		}
	}

	recheckInternetConnection()
    {
        if(window.navigator.onLine === false)
        {
            this._isMounted && this.updateInternetConnection(false);
        } 
    }

	viewDidMount()
	{
		this._isMounted && window.addEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.addEventListener('offline', () => this.updateInternetConnection(false));
        
        if(window.navigator.onLine === false)
        {
            this._isMounted && this.updateInternetConnection(false);
        } 
	}

	viewDidUnmount()
    {
        this._isMounted && window.removeEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.removeEventListener('offline', () => this.updateInternetConnection(false));
    }


    render()
    {
		const prefs = Session?.getPreferences();		
		
        return (
			<>
				{this.state?.isOnline
				?
					<div style={{direction:prefs?.dir}} className={`h-100 w-100 t-${prefs?.theme}-bg-primary not-scrollable`}>
						<div className="h-100 masterLayout-body-container not-scrollable">
							<Container className="h-100 p-0" fluid="fluid">
								<Row className="h-100 p-0 m-0">
									
									<Col xs={0} sm={0} md={1} lg={3}  className={`d-none d-md-block masterLayout-sidebarMenu h-100 p-5 t-${prefs?.theme}-bg-primary`}>
										<SidebarMenuView
											key={this.props?.sideMenuKey}
										/>
									</Col>
									<Col xs={12} sm={12} md={11} lg={this.state?.isCollapsed ? 11 : 9} className={"d-block m-0 p-0 h-100 masterLayout-children"}>
										
										{this.props.children}
										
									</Col>
									
								</Row>
							</Container>
						</div>
						<div className={`d-md-none masterLayout-bottom-menu-container t-${prefs?.theme}-bt-primary`}>
							{/* <TabbarView /> */}
						</div>
						{/*  d  */}
					</div>
				:
					
					<>{"NoInternetConnectionViewController"}</>
				}
			</>
        );
    }
}