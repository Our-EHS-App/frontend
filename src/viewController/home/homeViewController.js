import ViewController from '../../core/viewController';

import HomeView from '../../view/page/home/homeView';

export default class HomeViewController extends ViewController
{
	constructor(props)
	{
        super(props);
        
        this.state = 
        {
        }
    }

    viewControllerDidMount()
    { 

    }

	render()
	{
		return(
            <>
              <HomeView/>
            </>
		);
	}
}