urlApi = "http://localhost:3000/products/";
axios.get(urlApi)
    .then(function (res) {
        if (res.statusText === "OK") {
            document.querySelector('tbody').innerHTML = "";

            console.log(res);
            let data = res.data;
            let content = '';
            data.forEach(element => {
                content += `<tr id='${element.id}'>
                                <td>${element.id}</td>
                                <td><img src='${element.image}' width="70px"></td>
                                <td>${element.name}</td>
                                <td>${element.price}</td>
                                <td>${element.description}</td>                               
                                <td>
                                    <a href="./edit_product.html?id=${element.id}" class="btn btn-sm btn-warning">Sửa</a>
                                    <a onclick="deleteProduct(${element.id})"  class="btn btn-sm btn-danger">Xoá</a>                                    
                                </td>
                            </tr> `;
            });
            document.querySelector('tbody').innerHTML = content;
        };
    })

function addProduct() {
    let name = document.querySelector('[name="name"]').value;
    let price = document.querySelector('[name="price"]').value;
    let description = document.querySelector('[name="description"]').value;
    // let image = document.querySelector("#img_preview").getAttribute('src');
    let image = $("#img_preview").attr('src');
    // console.log($('td'));
    let requestObj = {
        name: name,
        image: image,
        price: Number(price),
        description: description,
        image: image,
    }
    // console.log(requestObj);
    urlApi = "http://localhost:3000/products/";
    axios.post(urlApi, requestObj)
        .then(data =>
            console.log(data));

    return false;
}
function getProductInfor() {
    const apiUrl = "http://localhost:3000/products/";
    //lay tham so tren url
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    //gửi request
    const getProductInfoUrl = apiUrl + id;
    // console.log(getProductInfoUrl);

    axios.get(getProductInfoUrl)
        .then(res => {
            // console.log(res);
            if (res.statusText === "OK") {
                productInfo = res.data;
                document.querySelector('[name="name"]').value = productInfo.name;
                // document.querySelector('[name="image"]').value = productInfo.image;
                $('#img_preview').attr('src', `${productInfo.image}`)
                document.querySelector('[name="price"]').value = productInfo.price;
                document.querySelector('[name="description"]').value = productInfo.description;

            }
        })
    // console.log(id);
}
function editProduct() {
    let name = document.querySelector('[name="name"]').value;
    // let image = document.querySelector('[name="image"]').value;
    let image = $("#img_preview").attr('src');
    let price = document.querySelector('[name="price"]').value;
    let description = document.querySelector('[name="description"]').value;
    const apiUrl = "http://localhost:3000/products/";
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    productInfo.name = name;
    productInfo.image = image;
    productInfo.price = price;
    productInfo.description = description;
    console.log(productInfo);
    //
    const updateProductUrl = apiUrl + id;
    axios.put(updateProductUrl, productInfo)
        .then(data => {
            console.log(data);
            if (data.statusText === "OK") {
            }
        });
    return false;
}
function deleteProduct(id) {
    const apiUrl = "http://localhost:3000/products/";
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    const deleteProductUrl = apiUrl + id;
    axios.delete(deleteProductUrl)
        .then(data => {
            console.log(data);
        })
}

//
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

