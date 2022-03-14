function loadProductInHomePage() {

    urlApi = "http://localhost:3000/products?_limit=8";
    axios.get(urlApi)
        .then(function (res) {
            if (res.statusText === "OK") {
                $('#product_main').text('');

                // console.log(res);
                let data = res.data;
                data.forEach(element => {
                    $('#product_main').append(`
                    <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat3">
                    <div class="featured__item">
                        <div id="img_product" class="featured__item__pic set-bg" data-setbg=''>
                        <img class="featured__item__pic set-bg" src='${element.image}'>
                            <ul class="featured__item__pic__hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6><a href="./frontend/shop-details.html?id=${element.id}">${element.name}</a></h6>
                            <h5>${element.price}đ</h5>
                        </div>
                    </div>
                </div>
                    `)
                });
            };
        })

}
function loadSlideShow() {
    urlApi = 'http://localhost:3000/slides/';
    axios.get(urlApi)
        .then(res => {
            if (res.statusText === "OK") {
                slides = res.data;
                let i = 0
                console.log(slides);
                slides.forEach(element => {
                    let isActive = (i == 0) ? 'active' : '';
                    $('#slideShow').append(`                    
                        <div class="carousel-item ${isActive}">
                            <img src="${element.image}" class="d-block w-100" alt="...">
                        </div>`);
                    i++;
                });
            }

        })
}