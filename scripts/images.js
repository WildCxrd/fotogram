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

// #region preparations

function loadAllImages() {
    const imagesPanel = document.getElementById("images-panel");

    imageFilePaths.forEach(imgFilePath =>
        imagesPanel.innerHTML += createImgHtml(imgFilePath, "openPhotoDialog")
    );

    preparePhotoDialog();
}

function preparePhotoDialog() {
    const photoDialog = document.getElementById("photo-dialog");
    photoDialog.addEventListener("close", closedPhotoDialog);
}

// #endregion

function loadDialogUiForImage(imageFilePath) {
    const photoDialogTitle = document.getElementById("photo-dialog-title");
    const currentDialogImage = document.getElementById("current-dialog-image");
    const currentImagePositionText = document.getElementById("current-image-position-text");
    const totalImageCountText = document.getElementById("total-image-count-text");

    photoDialogTitle.innerHTML = getFileName(imageFilePath);
    currentDialogImage.src = imageFilePath;
    currentImagePositionText.innerHTML = getImagePosition(imageFilePath);
    totalImageCountText.innerHTML = imageFilePaths.length;
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

// #region event handlers

function openPhotoDialog(event) {
    const photoDialog = document.getElementById("photo-dialog");
    const selectedImageFilePath = event.currentTarget.src;

    loadDialogUiForImage(selectedImageFilePath);

    photoDialog.showModal();
    photoDialog.classList.add("opened");
}

function closePhotoDialog() {
    const photoDialog = document.getElementById("photo-dialog");
    photoDialog.close();
}

function closedPhotoDialog() {
    const photoDialog = document.getElementById("photo-dialog");
    photoDialog.classList.remove("opened");
}

function loadNextImage() {
    const currentImagePosition = document.getElementById("current-image-position-text").innerHTML;
    const currentImageIndex = currentImagePosition - 1;
    let nextImageFilePath = "";

    if (currentImageIndex < imageFilePaths.length - 1) {
        nextImageFilePath = imageFilePaths[currentImageIndex + 1];
    }
    else {
        nextImageFilePath = imageFilePaths[0];
    }

    loadDialogUiForImage(nextImageFilePath);
}

function loadPreviousImage() {
    const currentImagePosition = document.getElementById("current-image-position-text").innerHTML;
    const currentImageIndex = currentImagePosition - 1;
    let previousImageFilePath = "";

    if (currentImageIndex > 0) {
        previousImageFilePath = imageFilePaths[currentImageIndex - 1];
    }
    else {
        previousImageFilePath = imageFilePaths[imageFilePaths.length - 1];
    }

    loadDialogUiForImage(previousImageFilePath);
}

// #endregion