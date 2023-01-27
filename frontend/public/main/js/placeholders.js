payload = JSON.parse(localStorage.getItem("payload"));
console.log(payload);
document.getElementById("main_name").textContent = `${payload.first_name} ${payload.last_name}`;
document.getElementById("last_updated").textContent = `Last Updated ${payload.last_update}`;

document.getElementById("account-fn").value  = `${payload.first_name}`;
document.getElementById("account-ln").value  = `${payload.last_name}`;
document.getElementById("account-email").value  = `${payload.email}`;
document.getElementById("account-un").value = `${payload.username}`;

