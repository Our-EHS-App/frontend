import { Component } from 'react';

import i18next from "i18next";
import { store } from 'react-notifications-component';

import Session from "../helper/session";

export default class View extends Component
{
    constructor(props)
	{
		super(props);

		this._isMounted = false;
	}
    
    changeLanguage()
    {
        const lang = Session.getPreferences().lang === "ar" ? "en" : "ar" ;

        Session.setPreferences("lang", lang);

        window.location.reload();
    }

    logout()
	{
        try
        {
            Session.setLoggedOut();
        }
        catch(e){}

        window.location = "/";
	}

    i18n(key)
	{
        return i18next.t(key)
	}

    showErrMsg(message, type)
    {
        if(type === "success")
        {
            store.addNotification({
                title: this.i18n("msg_successful"),
                message: message? message : this.i18n('msg_changesSaved'),
                type: "success",
                insert: "top",
                container: Session?.getPreferences()?.dir === "rtl" ? "top-left" : "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  pauseOnHover:true
                }
              });
        }
        else if(type === "error")
        {
            if(message)
            {
                store.addNotification({
                    title: this.i18n("error_title"),
                    message: message,
                    type: "danger",
                    insert: "top",
                    container: Session?.getPreferences()?.dir === "rtl" ? "top-left" : "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 3000,
                      pauseOnHover:true
                    }
                  });
            }
        }
        else{}
    }

	componentDidMount()
	{
		this._isMounted = true;
        
        if(this.viewDidMount)
        {
            this._isMounted && this.viewDidMount();
        }
    }    

    componentWillUnmount()
	{
		this._isMounted = false;

        if(this.viewDidUnmount)
        {
            this._isMounted && this.viewDidUnmount();
        }        
    }
}
