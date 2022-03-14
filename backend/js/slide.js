function previewFile() {
    const preview = document.querySelector('#img_preview');
    const file = document.querySelector('#image').files[0];
    const reader = new FileReader();


    reader.addEventListener('load', function () {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}
function saveSlide() {
    const image = $('#img_preview').attr('src');
    const description = $('[name="description"]').val();
    console.log(description);
    let data = {
        image: image,
        description: description,
    }
    urlApi = 'http://localhost:3000/slides/';
    axios.post(urlApi, data)
        .then(data =>
            console.log(data))
    return false;
}
function showListSlide() {
    urlApi = 'http://localhost:3000/slides/';
    axios.get(urlApi)
        .then(function (res) {
            if (res.statusText === "OK") {
                let data = res.data;
                data.forEach(element => {
                    $('tbody').append(`
                    <tr>
                        <td>${element.id}</td>
                        <td><img src="${element.image}"
                                alt="" width="150" srcset=""></td>
                        <td>${element.description}</td>
             
                        <td>
                            <a class="btn btn-sm btn-warning" href="./edit_slide.html?id=${element.id}" class="btn btn-sm btn-warning">Sửa</a>
                            <a class="btn btn-sm btn-danger" onclick="deleteSlide(${element.id})"  class="btn btn-sm btn-danger">Xoá</a>
                            
                        </td>
                    </tr>
                    `)

                });
            }
        })
}

function getSlideInfo() {
    const apiUrl = "http://localhost:3000/slides/";
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    const getSlideInfoUrl = apiUrl + id;
    axios.get(getSlideInfoUrl)
        .then(res => {
            if (res.statusText === "OK") {
                slideInfo = res.data;
                $('[name="description"]').val(slideInfo.description);
                $('#img_preview').attr('src', slideInfo.image);
            }
        })
}
function editSlide() {
    const apiUrl = 'http://localhost:3000/slides/';
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    const updateSlideUrl = apiUrl + id;

    let image = $('#img_preview').attr('src')
    let description = $('[name="description"]').val();

    slideInfo.image = image;
    slideInfo.description = description;

    axios.patch(updateSlideUrl, slideInfo)
        .then(data => {
            console.log(data);

        });
    // window.location.href = "./index.html";
    return false;
}
function deleteSlide(id) {
    const apiUrl = 'http://localhost:3000/slides/';
    let deleteSlideUrl = apiUrl + id;
    axios.delete(deleteSlideUrl)
        .then(data => {
            console.log(data);
        });
}
