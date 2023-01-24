let url = window.location.href;
match = "film_id="
let startIndex = url.indexOf(match);
let id = url.slice(startIndex + match.length);
console.log(id)

var getlink = `http://localhost:8081/flim_content/${id}`

axios.get(getlink,{
    headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`
    }
})
.then(response => {
    console.log(response.data)

    document.getElementById("addHtml").innerHTML += 

    `
    <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="images/product-item3.jpg" alt="..." /></div>
            <div class="col-md-6">
                <div class="small mb-1">Film ID: ${id}</div>
                <h1 class="display-5 fw-bolder">${response.data[0].title}</h1>
                <div class="fs-5 mb-5">
                    <span>${response.data[0].rating}</span>
                </div>
                <p class="lead">${response.data[0].description[0].toUpperCase()} ${response.data[0].description.toLowerCase().substring(1)}</p>
                <div class="d-flex">
                    <input class="form-control text-center me-4" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                    <button class="btn btn-outline-dark flex-shrink-0" type="button">
                        <i class="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
    `

})