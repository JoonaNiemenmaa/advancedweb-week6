import { Document, model, Schema } from "mongoose";

interface IOffer extends Document {
  title: string;
  description: string;
  price: number;
  imageId: string;
}

const offer_schema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String, required: true },
});

const Offer = model<IOffer>("Offer", offer_schema);

export { IOffer, Offer };
