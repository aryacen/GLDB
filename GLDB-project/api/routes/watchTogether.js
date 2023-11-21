import express from "express";
import { addEvent, getEvents, removeEvent } from "../controllers/calendar_con.js";
import { acceptRequest, addRequest, declineRequest, getReceivedRequest, getSentRequest, removeRequest } from "../controllers/watchTogetherRequest_con.js";


const router = express.Router();

router.post("/addEvent/:id", addEvent);
router.post("/removeEvent/:id", removeEvent);
router.get("/getEvents/:id", getEvents);
router.get("/getSentRequest/:id", getSentRequest);
router.get("/getReceivedRequest/:id", getReceivedRequest);
router.post("/addRequest", addRequest);
router.post("/removeRequest", removeRequest);
router.post("/accecpt/:id", acceptRequest);
router.post("/decline/:id", declineRequest);


export default router

