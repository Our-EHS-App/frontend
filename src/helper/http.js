import axios from "axios";
import AppConfigs from "../config/appConfigs";
import Session from "../helper/session";

const HTTP = {
	post: function (url, postData)
	{
		return axios({
			method: "post",
			url: url,
			data: postData,
			headers: {
				"Authorization": "Bearer " + Session.getToken(),
				"Content-Type": "multipart/form-data",
			},
		})

			.then(function(response){
				if (response.data !== undefined && response.data !== null)
				{
					if (response.data.error_code !== undefined && AppConfigs.errorCodesForLogout.includes(response.data.error_code))
					{
						// Session.setLoggedOut();
					}
					else
					{
						return response.data;
					}
				}
				else
				{
					return {
						is_successful: false,
						error_code: 1000,
						error_msg: "",
					};
				}
			})
			.catch(function (response){
				return {
					is_successful: false,
					error_code: 1000,
					error_msg: "",
				};
			});
	}
};

export default HTTP;
