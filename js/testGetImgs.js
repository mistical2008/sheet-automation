

function getImages(params) {
        let files = ["img1.jpg", "img2.jpg", "img3.jpg", ".SD Store"];
        let images = files.map(file => {
          file.match(/^(.(.?.*\.jpg$|.*\.png))*$/g);
        })
        return images;

}
let imgs = getImages();
