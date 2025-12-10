import mongoose from "mongoose";
import multer from "multer";
import { Router } from "express";
import { Offer } from "./models/offer";

const database = mongoose
  .connect("mongodb://localhost:27017/testdb")
  .catch((error) => console.log(error));

const upload = multer({ dest: "public/images/" });

const router = Router();

router.post("/upload", upload.single("image"), (request, response) => {
  const offer = new Offer({
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
  });
  offer.save();
  response.statusCode = 201;
  response.send();
});

export default router;
