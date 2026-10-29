const imageFilePaths = [
    "./assets/img/alaska.jpg",
    "./assets/img/anime.jpg",
    "./assets/img/atmosphere.png",
    "./assets/img/blue_tit.jpg",
    "./assets/img/hurricane.jpg",
    "./assets/img/lake.jpg",
    "./assets/img/moorente.jpg",
    "./assets/img/sea.jpg",
    "./assets/img/snow-bunting.jpg",
    "./assets/img/snow-leopard.jpg",
    "./assets/img/travel.jpg",
    "./assets/img/winter.jpg"
];

function loadAllImages() {
    const imagesPanel = document.getElementById("images-panel");

    imageFilePaths.forEach(imgFilePath =>
        imagesPanel.innerHTML += createImgHtml(imgFilePath, "openPhotoDialog")
    );
}

function openPhotoDialog(event) {
    const photoDialog = document.getElementById("photo-dialog");
    const selectedImageFilePath = event.currentTarget.src;

    const photoDialogTitle = document.getElementById("photo-dialog-title");
    const currentDialogImage = document.getElementById("current-dialog-image");
    const currentImageIndexText = document.getElementById("current-image-index-text");
    const totalImageCountText = document.getElementById("total-image-count-text");

    photoDialogTitle.innerHTML = getFileName(selectedImageFilePath);
    currentDialogImage.src = selectedImageFilePath;
    currentImageIndexText.innerHTML = getImagePosition(selectedImageFilePath);
    totalImageCountText.innerHTML = imageFilePaths.length;

    photoDialog.showModal();
    photoDialog.classList.add("opened");
}

function closePhotoDialog() {
    const photoDialog = document.getElementById("photo-dialog");
    photoDialog.close();
    photoDialog.classList.remove("opened");
}

function createImgHtml(imgFilePath, onClickFunctionName) {
    return `<img src="${imgFilePath}" alt="" onclick="${onClickFunctionName}(event)">`;
}

function getImagePosition(imageFilePath) {
    const fileNameWithExtension = getFileNameWithExtension(imageFilePath);

    for (let index = 0; index < imageFilePaths.length; index++) {
        const elementFilePath = imageFilePaths[index];
        const elementFileNameWithExtension = getFileNameWithExtension(elementFilePath);

        if (elementFileNameWithExtension == fileNameWithExtension) {
            return index + 1;
        }
    }
}

function getFileName(filePath) {
    const fileNameWithExtension = getFileNameWithExtension(filePath);
    const split = fileNameWithExtension.split(".");
    return split[0];
}

function getFileNameWithExtension(filePath) {
    const splitFilePath = filePath.split("/");
    return splitFilePath[splitFilePath.length - 1];
}