export class Approval {
    static approve(id: any) {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('approval[piece_id]', id);

        var config = {
            method: 'post',
            url: 'https://so-fa-dog-fookus-news-desk.herokuapp.com/approvals.json',
            headers: {
                ...data.getHeaders()
            },
            data: data
        };

        axios(config)
            .then(function (response: { data: any; }) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}