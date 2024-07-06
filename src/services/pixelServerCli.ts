import axios from 'axios';
const uploadImageUrl = process.env.VUE_APP_UPLOAD_IMAGE_URL;
const LOGIN_URL  = process.env.VUE_APP_LOGIN_URL;
const LOGIN_BY_GUEST_URL  = process.env.VUE_APP_LOGIN_BY_GUEST_URL;


export default {
    async saveImage(image: String) {
        const data = {
            image: image
        };

        return await axios.post(uploadImageUrl, data)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                // FIXME: Refactor the response.
                return {
                    status: -1
                };
            });
    },
    async login() {
        const data = {
            "account": process.env.VUE_APP_TEST_ACCOUNT,
            "pwd": process.env.VUE_APP_TEST_PWD
        };

        return await axios.post(LOGIN_URL, data)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                // FIXME: Refactor the response.
                return {
                    status: -1
                };
            });
    },
    async loginByGuest() {
        return await axios.post(LOGIN_BY_GUEST_URL,{})
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                // FIXME: Refactor the response.
                return {
                    status: -1
                };
            });
    }
}
