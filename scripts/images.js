const images = [
    alaska = { path: "./assets/img/alaska.jpg", alt: "A glacier in Alaska on the left side of the sea." },
    anime = { path: "./assets/img/anime.jpg", alt: "A street in a neon lighted city, drawn in an anime style." },
    atmosphere = { path: "./assets/img/atmosphere.png", alt: "Dark storm clouds." },
    blue_tit = { path: "./assets/img/blue_tit.jpg", alt: "A blue tit bird sitting on a branch." },
    hurricane = { path: "./assets/img/hurricane.jpg", alt: "The earth from space with a white hurricane." },
    lake = { path: "./assets/img/lake.jpg", alt: "A lake with a mountain to its left and the delta on the right." },
    moorente = { path: "./assets/img/moorente.jpg", alt: "A moorente in a lake." },
    sea = { path: "./assets/img/sea.jpg", alt: "A man standing on a rock in the sea by night." },
    snowBunting = { path: "./assets/img/snow-bunting.jpg", alt: "A snow bunting bird sitting on a rock." },
    snowLeopard = { path: "./assets/img/snow-leopard.jpg", alt: "Two young snow leopards on a rock." },
    travel = { path: "./assets/img/travel.jpg", alt: "A snowy mountain top under a blue sky." },
    winter = { path: "./assets/img/winter.jpg", alt: "A tree with snow on its branches standing in a snowfield." }
];

// #region preparations

function loadAllImages() {
    const imagesPanel = document.getElementById("images-panel");

    images.forEach(image =>
        imagesPanel.innerHTML += createImgHtml(image.path, image.alt, "openPhotoDialog")
    );

    preparePhotoDialog();
}

function preparePhotoDialog() {
    const photoDialog = document.getElementById("photo-dialog");
    photoDialog.addEventListener("close", closedPhotoDialog);
}

// #endregion

function loadDialogUiForImage(imageFilePath, alt) {
    const photoDialogTitle = document.getElementById("photo-dialog-title");
    const currentDialogImage = document.getElementById("current-dialog-image");
    const currentImagePositionText = document.getElementById("current-image-position-text");
    const totalImageCountText = document.getElementById("total-image-count-text");

    photoDialogTitle.innerHTML = getFileName(imageFilePath);
    currentDialogImage.src = imageFilePath;
    currentDialogImage.alt = alt;
    currentImagePositionText.innerHTML = getImagePosition(imageFilePath);
    totalImageCountText.innerHTML = images.length;
}

function createImgHtml(imgFilePath, alt, onClickFunctionName) {
    return `<img src="${imgFilePath}" alt="${alt}" onclick="${onClickFunctionName}(event)">`;
}

function getImagePosition(imageFilePath) {
    const fileNameWithExtension = getFileNameWithExtension(imageFilePath);

    for (let index = 0; index < images.length; index++) {
        const elementFilePath = images[index].path;
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

    loadDialogUiForImage(event.currentTarget.src, event.currentTarget.alt);

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
    let nextImageAlt = "";

    if (currentImageIndex < images.length - 1) {
        const nextImage = images[currentImageIndex + 1];

        nextImageFilePath = nextImage.path;
        nextImageAlt = nextImage.alt;
    }
    else {
        const firstImage = images[0];
        nextImageFilePath = firstImage.path;
        nextImageAlt = firstImage.alt;
    }

    loadDialogUiForImage(nextImageFilePath, nextImageAlt);
}

function loadPreviousImage() {
    const currentImagePosition = document.getElementById("current-image-position-text").innerHTML;
    const currentImageIndex = currentImagePosition - 1;

    let previousImageFilePath = "";
    let previousImageAlt = "";

    if (currentImageIndex > 0) {
        const previousImage = images[currentImageIndex - 1];

        previousImageFilePath = previousImage.path;
        previousImageAlt = previousImage.alt;
    }
    else {
        const lastImage = images[images.length - 1];

        previousImageFilePath = lastImage.path;
        previousImageAlt = lastImage.alt;
    }

    loadDialogUiForImage(previousImageFilePath, previousImageAlt);
}

// #endregion