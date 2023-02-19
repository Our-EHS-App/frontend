const Session =
{

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