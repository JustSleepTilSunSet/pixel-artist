import axios from 'axios';
const uploadImageUrl = process.env.VUE_APP_UPLOAD_IMAGE_URL;
const LOGIN_URL = process.env.VUE_APP_LOGIN_URL;
const LOGIN_BY_GUEST_URL = process.env.VUE_APP_LOGIN_BY_GUEST_URL;
const LIST_PAINTING_WITH_UID = process.env.VUE_APP_LIST_PAINTING_WITH_UID;
const LIST_GET_PAINTING = process.env.VUE_APP_LIST_GET_PAINTING;


export default {
    async uploadPainting(painting: any, accessToken: string | null, paintingDetail: { paintingName: string, paintingDescription: string }) {
        let formData = new FormData();
        formData.append('painting', painting, 'q1.jpeg');
        formData.append('paintingName', paintingDetail.paintingName);
        formData.append('paintingDescription', paintingDetail.paintingDescription);
        return await axios({
            method: "post",
            url: uploadImageUrl,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + accessToken
            },
        })
    },
    async login(account: string, password: string) {
        const data = {
            "account": account,
            "pwd": password
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
        return await axios.post(LOGIN_BY_GUEST_URL, {})
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
    async listImageById(accessToken: string) {
        return await axios({
            method: "post",
            url: LIST_PAINTING_WITH_UID,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
        }).then(response => {
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

    async getPainting(paintingPath: string, accessToken: string) {
        return await axios({
            method: "post",
            url: LIST_GET_PAINTING,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            data: {
                paintingPath
            }
        }).then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
            .catch(error => {
                console.error('Error:', error);
                return {
                    status: -1
                };
            });
    }

}
