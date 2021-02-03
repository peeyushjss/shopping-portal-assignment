# shoping-portal

Please follow the below steps to run this application.

1. Download the project in your system and extract.
2. Run the npm install or npm i command in shoping-client and shoping-portal folder if you deleted the node_modules.
3. Please check MongoDB is installed in your machine or not. Please install, if it is not installed.
4. Open 2 command prompt with folder shoping-portal and shoping-client.
5. Run npm start command to run the node(server) application in shoping-portal folder.
6. Run ng server command to run the angular(client) application in shoping-client folder.
7. Then you can open the below link in your browser: http://localhost:4200. This is the url of Angular Application

API details:

<!-- To create user or register -->
Request URL : http://localhost:8000/api/user
Request Method : POST
Request Body : {
    name : "ABC",
    email : "peeyush1891@gmail.com",
    password : "PQR123",
    mobile : 9599812027,
    address: "Noida"
}

<!-- To login for user -->
Request URL : http://localhost:8000/api/login
Request Method : POST
Request Body : {
    email : "peeyush1891@gmail.com",
    password : "PQR123"
}

<!-- To create order or place an order by user -->
Request URL : http://localhost:8000/api/order
Request Method : POST
Request Body : {
    name : "Smartphone",
    price : 27000
}

Happy Coding!!