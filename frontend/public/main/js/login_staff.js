$("#login-form").submit(function (k) {
    k.preventDefault();
    const email = $("#email").val();
    const password = $("#pass").val();

    const req = { email: email, password: password }

    console.log(password)
    axios.post('http://localhost:8081/staff', req)
        .then(response => {
            if (response.data.JWT) {
                localStorage.setItem('JWT', response.data.JWT);
                localStorage.setItem('payload', JSON.stringify(response.data.payload));
                window.location.href = '/index.html'
                // redirect to the home page or display a message
            } else {
                alert("Email or password is incorrect");
                console.log('error')
            }
        })
        .catch(error => {
            alert("Error in connecting to the server");
            console.log(error)
        })
})

