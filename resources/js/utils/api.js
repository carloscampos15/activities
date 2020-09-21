const apiCall = ({ url, method, data }) =>
    new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: data
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });

export default apiCall;