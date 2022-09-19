const express = require("express");
const router =express.Router();
const studentcontroller=require("../controllers/student controller");

router.get("/",studentcontroller.view);

router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);



router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);


router.get("/deleteuser/:id",studentcontroller.delete);




module.exports=router;   