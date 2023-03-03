import AppConfigs from '../config/appConfigs'
import i18n from 'i18next';

const Session =
{
    getPreferences: function()
    {
        const dir = localStorage.getItem("dir") ? localStorage.getItem("dir") : AppConfigs.defaultDirection;

        return{
            lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : AppConfigs.defaultLanguage,
            dir: dir, 
            altrDir: dir === "rtl" ? "ltr" : "rtl",
            theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : AppConfigs.defaultTheme,
            currency: localStorage.getItem("currency") ? localStorage.getItem("currency") : AppConfigs.defaultCurrency,
            country: localStorage.getItem("country") ? localStorage.getItem("country") : AppConfigs.defaultCountryCode,
            
        };
    },

    setPreferences: function(key, value)
    {
        const supportedValues = (key === "lang") ? AppConfigs.supportedLanguages :
                                (key === "dir")? AppConfigs.supportedDirections :
                                (key === "altrDir")? AppConfigs.supportedDirections :
                                (key === "theme")? AppConfigs.supportedThemes :
                                (key === "currency")? AppConfigs.supportedCurrencies :
                                (key === "country")? AppConfigs.supportedCountries :
                                [];

        if(supportedValues.includes(value))
        {
            localStorage.setItem(key, value);

            if(key === "lang")
            {
                const rtlLang = ["ar"];

                if(rtlLang.includes(value))
                {
                    localStorage.setItem("dir", "rtl");
                    localStorage.setItem("altrDir", "ltr");
                }
                else
                {
                    localStorage.setItem("dir", "ltr");
                    localStorage.setItem("altrDir", "rtl");
                }

                i18n.changeLanguage(value);
            }
        }
    },
    getToken: function()
    {
        return localStorage.getItem("token") ? localStorage.getItem("token") : "" ;
    },

    setToken: function(token)
    {
        localStorage.setItem("token", token);
    },


    setLoggedIn: function(velue)
    {
        localStorage.setItem('isLoggedIn', velue);
    },

    isLoggedIn: function ()
    {
        return localStorage.getItem('isLoggedIn') === "1";
    },

    setLoggedOut: function()
    {
        localStorage.setItem('isLoggedIn', "0");
        localStorage.setItem('token', JSON.stringify({}));
        localStorage.setItem('user_info', JSON.stringify({}));
    },
};

export default Session;