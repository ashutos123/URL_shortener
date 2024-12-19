const express=require("express");
const {handleGenerateNewShortURL, handleGetAnalytics }=require("../controllers/url");
 
const router=express.Router();

router.post('/',handleGenerateNewShortURL);//its a route
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports=router;


















