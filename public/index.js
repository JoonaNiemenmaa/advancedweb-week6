const form = document.getElementById("offerForm");
const offers_container = document.getElementById("offersContainer");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const url = "http://localhost:3000/upload";
	const options = {
		method: "POST",
		body: new FormData(form),
	};

	fetch(url, options);
});

function display_offers(offers) {
	for (const offer of offers) {
		const offer_container = document.createElement("div");
		offer_container.classList.add("offerDiv");

		const title = document.createElement("p");
		title.innerText = offer.title;
		offer_container.appendChild(title);

		const description = document.createElement("p");
		description.innerText = offer.description;
		offer_container.appendChild(description);

		const price = document.createElement("p");
		price.innerText = offer.price;
		offer_container.appendChild(price);

		if (offer.image) {
			const image = document.createElement("img");
			image.src = `http://localhost:3000/${offer.image}`;
			offer_container.appendChild(image);
		}

		offers_container.appendChild(offer_container);
	}
}

async function fetch_offers() {
	const url = "http://localhost:3000/offers";
	const offers = await (await fetch(url)).json();

	console.log(offers);

	if (offers) {
		display_offers(offers);
	}
}

fetch_offers();
