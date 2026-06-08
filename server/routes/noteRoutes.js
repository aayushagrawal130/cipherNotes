const express = require("express");

const router = express.Router();

const { createNote,getNotes,deleteNote,updateNote } = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");


// we update the route from createNote to protect, createNote,getnote,updatenote,deletenote
// create note
//router.post("/",createNote);
router.post("/",protect, createNote);



//GET NOTES
router.get("/", protect ,getNotes);

//UPDATE NOTES
router.put("/:id",protect ,updateNote);

//DELETE NOTE
router.delete("/:id",protect, deleteNote);



module.exports = router;