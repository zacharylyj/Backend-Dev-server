$("#search-form").submit(function (k) {
    k.preventDefault();
    const searchStr = $("#searchStr").val();


    const header = { authorization: `Bearer ${localStorage.getItem('JWT')}` }
    const req = { params: { searchStr } }


    $('.tab').removeClass('active');
    $('.active').removeClass('active');
    $('#search').addClass('active');
    $('li[data-tab-target="#search"]').addClass('active');


    const ul = document.getElementById("cat_header");
    var li = document.createElement('li');
    li.innerText = "Search";
    li.setAttribute("data-tab-target", "#search");
    li.classList.add("active", "tab");
    if (!(document.getElementById("search"))) {
        ul.appendChild(li);
    }

    const div = document.getElementById("cat_content");
    if (document.getElementById("search")) {
        div.removeChild(document.getElementById("search"))
    }
    var div1 = document.createElement('div');

    div1.setAttribute("id", "search");
    div1.setAttribute("data-tab-content", "");
    div1.classList.add("active");
    if (!(document.getElementById("search"))) {
        div.appendChild(div1);
    }
    var divactive = document.createElement('div');
    divactive.classList.add("row", "d-flex", "flex-wrap");

    axios.get('http://localhost:8081/film_search', req)
        .then(response => {
            var film_list = response.data;
            console.log(film_list)
            film_list.map(film => {
                const newDiv = document.createElement('div')
                newDiv.classList.add("product-item", "col-lg-2", "col-md-2", "col-sm-3")

                const imageHolder = document.createElement('a');
                imageHolder.className = 'image-holder';

                imageHolder.href = `film_detail.html?film_id=${film.film_id}`;

                const img = document.createElement('img');
                var imgsrc = "https://source.unsplash.com/1080x1350/?" + Math.floor(Math.random() * 1000)
                img.src = imgsrc;
                img.alt = "Film";
                img.className = "product-image";

                imageHolder.appendChild(img);

                const productDetail = document.createElement('div');
                productDetail.className = 'product-detail';

                const productTitle = document.createElement('div');
                productTitle.className = 'product-title';

                const productTitleLink = document.createElement('p');
                productTitleLink.href = "#";
                productTitleLink.innerHTML = film.title

                productTitle.appendChild(productTitleLink);

                const itemRating = document.createElement('div');
                itemRating.className = 'item-price';

                const itemRatingLink = document.createElement('p');
                itemRating.className = 'text-primary';
                itemRatingLink.innerHTML = `$${film.rental_rate}`

                itemRating.appendChild(itemRatingLink);

                productDetail.appendChild(productTitle);
                productDetail.appendChild(itemRating);

                newDiv.appendChild(imageHolder);
                newDiv.appendChild(productDetail);
                divactive.append(newDiv)
            })
            div1.appendChild(divactive);
        })
    li.scrollIntoView()
})