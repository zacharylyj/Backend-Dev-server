$("#login-form").submit(function (k) {
    k.preventDefault();
    const email = $("#email").val();
    const password = $("#pass").val();

    const req = { email: email, password: password }

    console.log(req)
    axios.post('http://localhost:8081/staff', req)
        .then(response => {
            if (response.data.JWT) {
                localStorage.setItem('JWT', response.data.JWT);
                localStorage.setItem('payload', JSON.stringify(response.data.payload));
                window.location.href = '/index.html'
                // redirect to the home page or display a message
            } 
        })
        .catch(error => {
            if (error.response.status === 403){
                alert("Email or Password is incorrect");
            }
            else{            
                alert("Error in connecting to the server");
                console.log(error)
            }
        })
})

