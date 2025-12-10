import { Document, model, Schema } from "mongoose";

interface IImage extends Document {
  filename: string;
  path: string;
}

const image_schema = new Schema<IImage>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const Image = model<IImage>("Image", image_schema);

export { IImage, Image };
