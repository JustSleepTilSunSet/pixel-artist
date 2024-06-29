import axios from 'axios';
const uploadImageUrl = process.env.VUE_APP_UPLOAD_IMAGE_URL;


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
    }
}
