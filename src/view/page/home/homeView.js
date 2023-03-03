import View from '../../../core/view';

export default class HomeView extends View
{
    render()
    {  
        return (
            <>
                <div className={`font-lg p-1`}>
                    {this.i18n('title_home')}
                </div>
            </>
        );
    }
}