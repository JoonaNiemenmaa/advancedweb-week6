import express from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
	response.send("It works!");
});

app.listen(port, () => {
	console.log(`Started server on port ${port}!`);
});
