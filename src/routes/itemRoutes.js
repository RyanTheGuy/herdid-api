import express from "express";
import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/getAllByUser/:userId", itemController.getAllByUser);

router.get("/getAll", itemController.getAll);

router.post("/create", itemController.create);

router.post("/createMultiple", itemController.createMultiple);

export default router;
