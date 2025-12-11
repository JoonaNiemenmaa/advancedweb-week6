import mongoose, { Types } from "mongoose";
import multer, { StorageEngine } from "multer";
import { v4 } from "uuid";
import { Router } from "express";

import { Offer } from "./models/Offer";
import { Image } from "./models/Image";

const database = mongoose
	.connect("mongodb://localhost:27017/testdb")
	.catch((error) => console.log(error));

const storage: StorageEngine = multer.diskStorage({
	destination: (request, file, callback) => {
		callback(null, "public/images");
	},
	filename: (request, file, callback) => {
		const dot = file.originalname.indexOf(".");
		const name = file.originalname.substring(0, dot);
		const extension = file.originalname.substring(dot);
		callback(null, `${name}_${v4()}${extension}`);
	},
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/upload", upload.single("image"), (request, response) => {
	try {
		let image_id: Types.ObjectId | null = null;
		if (request.file) {
			console.log(request.file);
			const image = new Image({
				filename: request.file.filename,
				path: request.file.path,
			});
			image_id = image._id;
			image.save();
		}

		const offer = new Offer({
			title: request.body.title,
			description: request.body.description,
			price: request.body.price,
		});

		if (image_id) {
			offer.imageId = image_id;
		}

		offer.save();

		return response.status(201).send("Offer uploaded successfully!");
	} catch (error) {
		console.log(`Error uploading file: ${error}`);
		return response.status(500).send("Internal server error");
	}
});

type TResponseOffer = {
	title: string;
	description: string;
	price: Number;
	image: string | null;
};

router.get("/offers", async (request, response) => {
	const offers = await Offer.find();

	async function find_image(
		id: Types.ObjectId | undefined,
	): Promise<string | null> {
		return id ? (await Image.find({ _id: id }))[0].path.substring(7) : null;
	}

	const response_json: TResponseOffer[] = [];
	for (const offer of offers) {
		const response_offer: TResponseOffer = {
			title: offer.title,
			description: offer.description,
			price: offer.price,
			image: await find_image(offer.imageId),
		};
		response_json.push(response_offer);
	}

	response.json(response_json);
});

export default router;
