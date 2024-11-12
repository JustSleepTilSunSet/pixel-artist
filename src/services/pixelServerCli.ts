import axios from 'axios';
const uploadImageUrl = process.env.VUE_APP_UPLOAD_IMAGE_URL;
const LOGIN_URL  = process.env.VUE_APP_LOGIN_URL;
const LOGIN_BY_GUEST_URL  = process.env.VUE_APP_LOGIN_BY_GUEST_URL;


export default {
    async uploadPainting(painting:any){
        let formData = new FormData();
        formData.append('painting',painting,'q1.jpeg');
        await axios({
            method: "post",
            url: uploadImageUrl,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
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
