payload = JSON.parse(localStorage.getItem("payload"));
console.log(payload);
document.getElementById("main_name").textContent = `${payload.first_name} ${payload.last_name}`;
document.getElementById("last_updated").textContent = `Last Updated ${payload.last_update}`;

document.getElementById("account-fn").placeholder = `${payload.first_name}`;
document.getElementById("account-ln").placeholder = `${payload.last_name}`;
document.getElementById("account-email").placeholder = `${payload.email}`;
document.getElementById("account-un").placeholder = `${payload.username}`;

