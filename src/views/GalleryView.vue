<template>
    <div class="container">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center align-items-center flex-column">
                        <div class="col-sm-9 text-center">
                            Your painting
                            <img class="img-fluid"></img>
                            <div class="row justify-content-center align-items-center">
                                <div class="col-8 col-sm-6 text-center">
                                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1"
                                        placeholder="PaintingName">

                                </div>
                                <div class="col-4 col-sm-6 text-center">
                                    <label for="paintingDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="paintingDescription" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            ref="closeButton">Close</button>
                        <button id="modalUpload" type="button" class="btn btn-primary" @click="">Edit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4 text-center mb-3" v-for="item in paintings" :key="item.id">
                <button color="primary" id="btn2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    class="btn btn-info">
                    測試
                </button>
                <img style='display:block; width:100px;height:100px;' id='base64image'
                :src="item.image" class="border p-3" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import pixelServerCli from '@/services/pixelServerCli';

const paintings = ref([]);
onMounted(async () => {
    let accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
        console.log("Missing token.");
        return;
    }
    // console.log(accessToken);
    let getPaintingList = await pixelServerCli.listImageById(accessToken);
    console.log(JSON.stringify(getPaintingList, null, 2));
    let paintingList = getPaintingList.data.paintingResult.map(({ paintingPath }) => paintingPath);
    let paintingData = await pixelServerCli.getPainting(paintingList[0]);
    for (let idx = 0; idx < 10; idx++) {
        paintings.value.push({
            idx,
            image: "data:image/jpeg;base64, " + paintingData.image
        });
    }
})
</script>