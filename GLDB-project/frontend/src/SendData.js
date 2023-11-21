import axios from "axios";

function SendData() {
  console.log("sending data to backend");
  const data = { name: "John", age: 30 };

  axios
    .post("http://localhost:9000/api/data", data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export default SendData;
