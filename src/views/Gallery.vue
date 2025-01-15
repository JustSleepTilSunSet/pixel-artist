<template>
    <div class="container">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Yours</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center align-items-center flex-column">
                        <div class="col-sm-9 text-center">
                            Your painting
                            <img class="img-fluid" :src="focusedPainting"></img>
                            <div class="row justify-content-center align-items-center">
                                <div class="col-8 col-sm-6 text-center">
                                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1"
                                        disabled="true" v-model="focusedPaintingName" placeholder="PaintingName">

                                </div>
                                <div class="col-4 col-sm-6 text-center">
                                    <label for="paintingDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="paintingDescription" rows="3" disabled="true"
                                        v-model="focusedPaintingDetail"></textarea>
                                </div>
                            </div>
                            <div>
                                <el-rate v-model="ratingValue" allow-half />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            ref="closeButton">Close</button>
                        <button id="modalUpload" type="button" class="btn btn-primary" @click="toEdit">Edit</button>
                        <button id="modalUpload" type="button" class="btn btn-danger" @click="toDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4 text-center mb-3" v-for="item in paintings" :key="item.id">
                <img style='display:block; width:100px;height:100px;' id='base64image' data-bs-toggle="modal"
                    data-bs-target="#exampleModal" :src="item.image" class="border p-3" @click="toShowDetail(item)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import pixelServerCli from '@/services/pixelServerCli';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const ratingValue = ref();
const paintings = ref([]);
const focusedPainting = ref();
const focusedPaintingName = ref();
const focusedPaintingDetail = ref();
const focusedPaintingMap = ref();
const focusedPaintingPath = ref();
const closeButton = ref();
const router = useRouter();
async function getPainting() {
    let accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
        console.log("Missing token.");
        return;
    }
    paintings.value = [];
    let getPaintingList = await pixelServerCli.listImageById(accessToken);
    let paintingList = getPaintingList.data.paintingResult;
    for (let idx = 0; idx < getPaintingList.data.paintingCount; idx++) {
        let paintingData = await pixelServerCli.getPainting(paintingList[idx].paintingPath);
        let paintingMap = await pixelServerCli.getPixelMapByPath(paintingList[idx].paintingPath);
        let paintingInfo = {
            image: "data:image/jpeg;base64, " + paintingData.image,
            paintingDescription: paintingList[idx].paintingDescription,
            customName: paintingList[idx].customName,
            paintingMap: paintingMap.pixelMap,
            paintingPath: paintingList[idx].paintingPath
        };
        paintings.value.push(paintingInfo);
    }
}
onMounted(async () => {
    try {
        await getPainting();
    } catch (err) {
        console.log(err.message);
    }
})

function toShowDetail(painting) {
    focusedPainting.value = painting.image;
    focusedPaintingName.value = painting.customName;
    focusedPaintingDetail.value = painting.paintingDescription;
    focusedPaintingMap.value = painting.paintingMap;
    focusedPaintingPath.value = painting.paintingPath;
}

function toEdit() {
    store.commit('setPainting', {
        focusedPainting: focusedPainting.value,
        focusedPaintingName: focusedPaintingName.value,
        focusedPaintingDetail: focusedPaintingDetail.value,
        focusedPaintingMap: focusedPaintingMap.value
    });
    closeButton.value.click();
    router.push('/draw');
}

async function toDelete() {
    if (confirm("are you sure?")) {
        await pixelServerCli.deletePaintingByPath(focusedPaintingPath.value);
        closeButton.value.click();
        await getPainting();
    }
}
</script>