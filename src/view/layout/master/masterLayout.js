import View from '../../../core/view';

import "./masterLayout.scss";

export default class MasterLayoutView extends View
{
	constructor(props)
	{
		super(props)
	
		this.state =
		{
			isOnline:true
		}
    }

	updateInternetConnection(flag)
    {
		this._isMounted && this.setState({...this.state, isOnline:flag});
			
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

	viewControllerDidMount()
	{
		this._isMounted && window.addEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.addEventListener('offline', () => this.updateInternetConnection(false));
        
        if(window.navigator.onLine === false)
        {
            this._isMounted && this.updateInternetConnection(false);
        } 
	}

	viewControllerDidUnmount()
    {
        this._isMounted && window.removeEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.removeEventListener('offline', () => this.updateInternetConnection(false));
    }


    render()
    {
        return (
			<>
				{this.state?.isOnline
				?
					<div  className={`masterLayout-mainContainer h-100 p-4 t-bg-secondary`}>
						{this.props.children}
					</div>
				:
					
					<>{"NoInternetConnectionViewController"}</>
				}
			</>
        );
    }
}