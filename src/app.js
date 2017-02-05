import axios from "axios";
import "./app.css";
import {ROOT_URL} from "./config";

const form = document.querySelector("form");
const table = document.querySelector("table");

let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

let message = "";

const addHeaders = (headers) => {
	let tr = document.createElement("tr");

	headers.map((item) => {
		let th = document.createElement("th");
		let span = document.createElement("span");
		const {name} = item;
		const {icon} = item;
		const classIcon = `icon fa ${icon}`;

		th.innerText = name;
		span.setAttribute("class", classIcon);
		th.appendChild(span);
		tr.appendChild(th);
	});

	thead.appendChild(tr);
	thead.classList.add("hidden");
	table.appendChild(thead);
};

addHeaders([
    { name: "City", icon: "fa-map-marker" },
    { name: "Temperature [C]", icon: "fa-thermometer-0" },
    { name: "Pressure [hpa]", icon: "fa-area-chart" },
    { name: "Humidity [%]", icon: "fa-tint" }
]);

const addRow = (arr) => {
	let tr = document.createElement("tr");

	arr.map((data) => {
		let td = document.createElement("td");
		td.innerText = data;
		tr.appendChild(td);
		tbody.appendChild(tr);
	});
};

const renderWeather = (cityData) => {
	if (cityData) {
		addRow([ cityData.name, cityData.main.temp, cityData.main.pressure, cityData.main.humidity ]);
		table.appendChild(tbody);
	}
};

const formMessage = (messageText) => {
	let messageTarget = document.querySelector(".message");

	if (messageText) {
		messageTarget.innerText = messageText;
		messageTarget.classList.add("message--error");
	}  else {
		messageTarget.innerText = "";
		messageTarget.classList.remove("message--error");
	}
	message = "";
};

const fetchWeather = (city) => {
	const url = `${ROOT_URL}&q=${city}`;
	const request = axios.get(url);

	if (!city)
		return;

	request.then((response) => {
		thead.classList.remove("hidden");
		renderWeather(response.data);
	}).catch(() => {
		message = "Invalid city name. Try again!";
		formMessage(message);
	});
};

const startApp = () => {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const city = form.city.value;

		if (!city)
			message = "Enter city name!";

		formMessage(message);
		fetchWeather(city);
		form.city.value = "";
	});
};

startApp();
