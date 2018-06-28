

let files = ["img1.jpg", "img2.jpg", "img3.jpg", ".SD Store"];
let images = files.filter(function (file) {
  return (/^(.(.?.*\.jpg$|.*\.png))*$/g).test(file)
})
