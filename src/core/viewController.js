import { Component } from 'react';

import i18next from "i18next";
import { store } from 'react-notifications-component';

import Session from '../helper/session';

export default class ViewController extends Component
{
    constructor(props)
	{
		super(props);

		this.state =
		{
            viewIsLoading:false,
            activeView: "",
            loadingBarProgress: 0,
		}

		this._isMounted = false;
	}

    showErrMsg(message, type)
    {
        if(type === "success")
        {
            store?.addNotification({
                title: this.i18n('msg_successful'),
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
        else if(type === "warning")
        {
            if(message)
            {
                store?.addNotification({
                    title: this.i18n('error_title'),
                    message: message,
                    type: "warning",
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
        else
        {
            if(message)
            {
                store?.addNotification({
                    title: this.i18n('error_title'),
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
    }

    setTitle(title)
    {
        document.title = `${i18next.t('title_pickupPoint')} | ${i18next.t(title)}`;
    }

    changeLanguage()
    {
        const lang = Session.getPreferences().lang === "ar" ? "en" : "ar" ;

        Session.setPreferences("lang", lang);

        window.location.reload();
    }

    i18n(key)
	{
        return i18next.t(key)
	}    

    openModal(activeModal)
    {
        if(this.props.toggleModal)
        {
            this.props.toggleModal('open', activeModal);
        }
    }

    closeModal(activeModal)
    {
        if(this.props.toggleModal)
        {
            this.props.toggleModal('close', activeModal);
        }
    }

    startLoading()
    {
        this._isMounted && this.setState({...this.state, viewIsLoading : true,loadingBarProgress: 10});
    }

    stopLoading()
    {
        this._isMounted && this.setState({...this.state, viewIsLoading : false, loadingBarProgress: 100});
    }

    updateProgressBar(val)
    {
        this._isMounted && this.setState({...this.state, loadingBarProgress: val});
    }

	componentDidMount()
	{
		this._isMounted = true;

        if(this.viewControllerDidMount)
        {
            this._isMounted && this.viewControllerDidMount();
        }
    }    

    componentWillUnmount()
	{
		this._isMounted = false;

        if(this.viewControllerDidUnmount)
        {
            this.viewControllerDidUnmount();
        }        
	}
}