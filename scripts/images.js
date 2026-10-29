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
        imagesPanel.innerHTML += createImgHtml(imgFilePath)
    );
}

function createImgHtml(imgFilePath) {
    return `<img src="${imgFilePath}" alt="">`;
}