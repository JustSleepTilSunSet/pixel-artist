import axios from 'axios';
const uploadImageUrl = "http://127.0.0.1:10000/saveImage";

  
export default {
    async saveImage(image:String){
        const data = {
            image: image
        };

        axios.post(uploadImageUrl, data)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
