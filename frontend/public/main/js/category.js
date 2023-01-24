axios.get('http://localhost:8081/film_catergories',{
    headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`
    }
})
.then(response => {
    var cat_list = response.data

    const ul = document.getElementById("cat_header");   
    var li = document.createElement('li');
    li.innerText = "All";
    li.setAttribute("data-tab-target", "#all");
    li.classList.add("active", "tab");
    ul.appendChild(li);

    cat_list.map(cat => {
        li = document.createElement('li');
        li.innerText = cat.name;
        li.setAttribute("data-tab-target", "#" + cat.name.toLowerCase());
        li.classList.add("tab");
        ul.appendChild(li);
    });
    
    const div = document.getElementById("cat_content");   
    var div1 = document.createElement('div');

    div1.setAttribute("id", "all");
    div1.setAttribute("data-tab-content", "");
    div1.classList.add("active");
    div.appendChild(div1);
    var divactive = document.createElement('div');
    divactive.classList.add("row", "d-flex", "flex-wrap");

    cat_list.map((cat, i)=> {

        var getlink = `http://localhost:8081/film_categories/${i+1}/films`
        axios.get(getlink,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('JWT')}`
            }
        })
        .then(response => {
    
        var film_list = response.data;
        film_list.map(film => {
            const newDiv = document.createElement('div')
            newDiv.classList.add("product-item", "col-lg-1", "col-md-2", "col-sm-2")
    
            const imageHolder = document.createElement('div');
            imageHolder.className = 'image-holder';
    
            const img = document.createElement('img');
            img.src = "images/selling-products6.jpg";
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
            itemRatingLink.innerHTML = film.rating

            itemRating.appendChild(itemRatingLink);
    
            productDetail.appendChild(productTitle);
            productDetail.appendChild(itemRating);
    
            newDiv.appendChild(imageHolder);
            newDiv.appendChild(productDetail);
            divactive.append(newDiv)       
        })
        div1.appendChild(divactive)
        })
        .catch(error => {        
            console.log(error)
        })
    });

    cat_list.map((cat, i)=> {
        var div1 = document.createElement('div');
        div1.setAttribute("id", cat.name.toLowerCase());
        div1.setAttribute("data-tab-content", "");
        div.appendChild(div1);
    
        var getlink = `http://localhost:8081/film_categories/${i+1}/films`
        axios.get(getlink,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('JWT')}`
            }
        })
        .then(response => {
        var film_list = response.data
        var divactive = document.createElement('div');
        divactive.classList.add("row", "d-flex", "flex-wrap");
    
        film_list.map(film => {
            const newDiv = document.createElement('div')
            newDiv.classList.add("product-item", "col-lg-1", "col-md-2", "col-sm-2")
    
            const imageHolder = document.createElement('div');
            imageHolder.className = 'image-holder';
    
            const img = document.createElement('img');
            img.src = "images/selling-products6.jpg";
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
            itemRatingLink.innerHTML = film.rating

            itemRating.appendChild(itemRatingLink);
    
            productDetail.appendChild(productTitle);
            productDetail.appendChild(itemRating);
    
            newDiv.appendChild(imageHolder);
            newDiv.appendChild(productDetail);
            divactive.append(newDiv);      
        })
        div1.appendChild(divactive);
        })
        .catch(error => {        
            console.log(error);
        })
    });
})
.catch(error => {        
    alert("Error in connecting to the server");
    console.log(error)
})


$("#update_user_details").onload(function (k) {

$.ready(function() {
    console.log("runin")
    const tabs = document.querySelectorAll('[data-tab-target]')
    console.log(tabs)
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      console.log("2")
      tab.addEventListener('click', () => {
        console.log("3")
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });

})













