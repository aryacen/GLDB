import express from "express";
import { update_user, delete_user, get_user, update_profile_picture, subscribe, send_friend_request, accept_friend_request, decline_friend_request, friend_request_status, remove_friend, friend_status, ban_status, set_border_colour, update_genres, add_to_watched, remove_from_watched, inWatchedlist } from "../controllers/user.js";
import { verify_token, verify_user} from "../utils/verify_token.js"

const router = express.Router();
// router.post("/checkuserauthF", verify_token_frontend);
router.post("/checkuserauth", verify_token,(req, res, next) => {
    // console.log(req.body.data)
    // console.log(req.body)
    // console.log("hello");
    console.log("USER  AUTHENTICATED")
    res.send("User authenticated")
});

// router.get("/checkuser/:id", verify_user, (req, res, next) => {
//     res.send("User authenticated!!")
// }); 

// change username
router.put("/update/:id", update_user);

router.put("/profilepicture/:id", update_profile_picture);

router.delete("/:id", verify_user, delete_user);

router.get("/:id", get_user);

//router.get("/:id", verify_admin, get_all_user);
router.put("/subscribe/:id", subscribe);

router.post("/sendfriendrequest", send_friend_request);

router.post("/acceptfriendrequest", accept_friend_request);

router.post("/declinefriendrequest", decline_friend_request);

router.post("/friendrequeststatus", friend_request_status);

router.post("/removefriend", remove_friend);

router.post("/friendstatus", friend_status);

router.post("/banstatus", ban_status);

router.put("/setbordercolor/:id", set_border_colour);

router.put("/updategenres", update_genres);

router.put("/watch/:id", add_to_watched);

router.put("/removewatch/:id", remove_from_watched);

router.post("/inwatchlist", inWatchedlist);

export default router