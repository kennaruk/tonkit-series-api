var express = require("express");
var router = express.Router();

router.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

var todoJsons = [
	{
		id: 0,
		title: "Demo",
		description: "Description of demo item",
		done: true,
		createdBy: "5809610222"
	}
];
var id = 1;

/* GET home page. */
router.get("/", function(req, res) {
	res.send(
		"Welcome to TONKIT THE SERIES#1 Workshop API. Are you looking for /todo endpoint?"
	);
});

router.get("/todo", function(req, res) {
	const { stdId = "" } = req.query;

	if (!stdId) {
		res.json(todoJsons);
	} else {
		let tmp = [];
		for (let i = 0; i < todoJsons.length; i++) {
			const element = todoJsons[i];
			if (element.createdBy === stdId) tmp.push(element);
		}
		res.json(tmp);
	}
});

router.post("/todo", function(req, res) {
	const {
		title = "Not assigned",
		description = "Not assigned",
		done = false,
		createdBy = "Not assigned"
	} = req.body;

	const newTodo = { id: id++, title, description, done, createdBy };
	todoJsons.push(newTodo);
	res.json(newTodo);
});

router.get("/todo/:todoId", function(req, res) {
	const { todoId } = req.params;

	let tmp = [];
	for (let i = 0; i < todoJsons.length; i++) {
		const element = todoJsons[i];
		if (element.id === parseInt(todoId)) tmp.push(element);
	}
	res.json(tmp);
});

router.put("/todo/:todoId", function(req, res) {
	const { todoId = -1 } = req.params;

	const {
		title = null,
		description = null,
		done = null,
		createdBy = null
	} = req.body;

	for (let i = 0; i < todoJsons.length; i++) {
		const element = todoJsons[i];
		if (element.id === parseInt(todoId)) {
			if (title) element.title = title;
			if (description) element.description = description;
			if (done) element.done = done;
			if (createdBy) element.createdBy = createdBy;
			return res.json(element);
		}
	}
	res.json({ statusCode: 400, message: "Not found todo with id " + todoId });
});

router.delete("/todo/:todoId", function(req, res) {
	const { todoId } = req.params;

	for (let i = 0; i < todoJsons.length; i++) {
		const element = todoJsons[i];
		if (element.id === parseInt(todoId)) {
			const spliceItem = todoJsons.splice(i, 1);
			return res.json(spliceItem);
		}
	}
	res.json({ statusCode: 400, message: "Not found todo with id " + todoId });
});
module.exports = router;
