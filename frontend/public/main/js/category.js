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
    li.classList.add("tab", "active");
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
    div1.setAttribute("data-tab-target", "");
    div1.classList.add("active");
    console.log(div1)
    div.appendChild(div1);


    cat_list.map(cat => {
        div1 = document.createElement('div');

        div1.setAttribute("id", cat.name.toLowerCase());
        div1.setAttribute("data-tab-target", "");
        console.log(div1)
        div.appendChild(div1);
    });


    for(var i = 0; i < cat_list.length; i++){
        console.log(i+1)
        var getlink = `http://localhost:8081/film_categories/${i+1}/films`
        axios.get(getlink,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('JWT')}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {        
            console.log(error)
    })
      
    }    
})

.catch(error => {        
        alert("Error in connecting to the server!!!!!!!");
        console.log(error)
})





// exercises.map(exercise => {
//     return <ExerciseListItem key={exercise._id}
//                             exercise={exercise}
//                             updateListFunction={retrieveExercises}/>
// })
// function to_li() {
//     var numberOfElements = 5;
//     var myList = document.getElementById("cat_header");
//     for (var i = 0; i < numberOfElements; i++) {
//         var newLI = document.createElement("li");
//         newLI.setAttribute("data-tab-target", "#all");
//         newLI.setAttribute("class", "active tab");
//         newLI.innerHTML = "All";
//         myList.appendChild(newLI);
//     }
// }






