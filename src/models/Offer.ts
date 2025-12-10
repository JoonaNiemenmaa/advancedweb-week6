import { Document, model, Schema, Types } from "mongoose";

interface IOffer extends Document {
	title: string;
	description: string;
	price: number;
	imageId?: Types.ObjectId;
}

const offer_schema = new Schema<IOffer>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	imageId: Types.ObjectId,
});

const Offer = model<IOffer>("Offer", offer_schema);

export { IOffer, Offer };
