import View from '../../../core/view';

import { NavLink } from "react-router-dom";
import { Container, Row} from "reactstrap";

import Session from "../../../helper/session";

import "./sidebarMenuView.scss";

export default class SidebarMenuView extends View
{

    render()
    {
		const prefs = Session.getPreferences();
		let menuItems =
		[
			{
				title: "dashboard" || "/",
				text: this.i18n('title_dashboard'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active:1
			},
			{
				title: "staffeMangment",
				text: this.i18n('title_staffManagemen'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active: 1,
			},
			{
				title: "inbox",
				text: this.i18n('title_inbox'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active:1
			},
			{
				title: "workplace",
				text: this.i18n('title_workplace'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active:1
			},
			{
				title: "settings",
				text: this.i18n('title_settings'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active:1
			},
			{
				title: "reports",
				text: this.i18n('title_reports'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active: 1
			},
			{
				title: "help",
				text: this.i18n('title_help'),
				iconSidebar: "",
				requiredLogIn:false,
				is_active:1
			}
			
		];


        return (
			<>
				<Row className={`p-0 m-0 h-100 t-${prefs?.theme}-text-alternative justify-content-center scrollable-y`} style={{overflowY:"hidden"}}>
					<Row className="align-content-start p-0 m-0">
						
						<div className={`p-0 mt-4 mb-2 t-${prefs?.theme}-text-secondary-highlight font-xl pointer opacity-hover `}>
                            {this.i18n('title_logo')}
						</div>

						<Container className="themed-container p-0 py-4 m-0 w-100" fluid={true}>
                            {menuItems?.filter(item => item.is_active === 1)?.map((path, index) =>
                                {
                                    return (
                                        <NavLink className="naked" key={`${path.title}-${index}`} to={path.title}>
                                            {({ isActive }) => (
                                                <div className={`p-0 m-0 font-md t-${prefs?.theme}-text-primary-highlight`}>
                                                <div className={`m-0 p-0 ${isActive ? `t-${prefs?.theme}-bg-secondary` : ``}`}>
                                                    <div className={`m-0 p-0 text-center`}>
                                                        {path.iconSidebar}
                                                    </div>
                                                    <div className={`p-0 d-none ${this.props?.isCollapsed ? 'd-lg-none' : 'd-lg-block'} px-2 py-3 ${prefs?.dir}-primaryFont`}>
                                                        <p>
                                                            {path.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>	
                                            )}
                                        </NavLink>
                                    )
                                })
                            }
						</Container>
						
					</Row>
				</Row>
			</>
		);
    }
}
