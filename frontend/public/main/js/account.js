$("#update_user_details").submit(function (k) {
    k.preventDefault();
    if (
        $("#account-fn").val() == undefined ||
        $("#account-ln").val() == undefined ||
        $("#account-email").val() == undefined ||
        $("#account-un").val() == undefined ||
        $("#account-pass").val() == undefined ||
        $("#account-confirm-pass").val() == undefined
    ) {
        alert(`Missing Data`)
    }
    else {
        const first_name = $("#account-fn").val();
        const last_name = $("#account-ln").val();
        const email = $("#account-email").val();
        const username = $("#account-un").val();
        const password = $("#account-pass").val();
        const password2 = $("#account-confirm-pass").val();

        function checkun(username) {
            const unRegex = /^[a-zA-Z0-9]+$/;
            return unRegex.test(username);
        }
        function checkpw(password) {
            const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/;
            return pwRegex.test(password);
        }
        var usernamelen = username.length
        var passwordlen = password.length

        if (usernamelen < 3) {
            alert(`{"username_error":"Username needs to have 3 or more characters"}`);
        }
        else if (!(checkun(req.body.username))) {
            alert(`{"username_error":"Only number and letters are allowed"}`);
        }
        else if (passwordlen < 8) {
            alert(`{"password_error":"Password needs to have 8 or more characters"}`);
        }
        else if (!(checkpw(req.body.password))) {
            alert(`{"password_error":"At least 1 Upper, Lower & Special Characters are required."}`);
        }
        else if (password != password2) {
            alert(`{"password_error":"Not Matching"}`);
        }
        else {
            const req = { first_name: first_name, last_name: last_name, email: email, username: username, password: password }
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
                    if (error.response.status === 403) {
                        alert("Email or Password is incorrect");
                    }
                    else {
                        alert("Error in connecting to the server");
                        console.log(error)
                    }
                })
        }
    }
})

$("#addcustomer").submit(function (k) {
    k.preventDefault();
    var add2 = ""
    if ($("#add2").val() != undefined) {
        add2 = $("#add2").val()
    }
    const config1 = {
        data: {
            "store_id": $("#store-id").val(),
            "first_name": $("#account-fn").val(),
            "last_name": $("#account-ln").val(),
            "email": $("#account-email").val(),
            "address": {
                "address_line1": $("#add1").val(),
                "address_line2": add2,
                "district": $("#district").val(),
                "city_id": $("#city-id").val(),
                "postal_code": $("#postal").val(),
                "phone": $("#phone").val()
            }
        },
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
            }
        
    }
    axios.post('http://localhost:8081/customers', config1.data, { headers: config1.headers })
        .then(response => {
            console.log(response.data)
            alert(`New Customer Added id: ${response.data.customer_id}`)
            window.location.href = '/account.html'
        })
        .catch(error => {
            if (error.response.status === 409)
                alert("Email is already being used")
            else {
                alert("Error in connecting to the server");
                console.log(error)
            }
        })
})

$("#addactor").submit(function (k) {
    k.preventDefault();
    if (
        $("#account-fn").val() == undefined ||
        $("#account-ln").val() == undefined
    ) {
        alert(`Missing Data`)
    }

    else {


        const config = {
            data: { first_name: $("#account-fn").val(), last_name: $("#account-ln").val() },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
            }
        };
        axios.post('http://localhost:8081/actors', config.data, { headers: config.headers })
            .then(response => {
                console.log(response.data)
                alert(`New Actor Added id: ${response.data.actor_id}`)
                window.location.href = '/account.html'

            })
            .catch(error => {
                if (error.response.status === 403) {
                    alert("Email or Password is incorrect");
                }
                else {
                    alert("Error in connecting to the server");
                    console.log(error)
                }
            })
    }
})




