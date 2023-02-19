import HTTP from '../helper/http';

const HomeModel =
{
    getAll: async function(pageNumber,timestamp)
    {
        var url = 'https://';

        var postData = new FormData();
        postData.append("page_number", pageNumber);
        postData.append("timestamp", timestamp);

        return await HTTP.post(url, postData).then(response =>{return response;})
    },
}

export default HomeModel;