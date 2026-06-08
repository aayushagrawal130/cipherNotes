const Note = require("../models/Note");

//create note
const createNote = async (req,res) =>{
    try{

        const { title, content } = req.body;

        //validation
        if(!title || !content ){
            return res.status(400).json({
                message:"Title and content are required",
            });
        }
        // create note
        const note = await Note.create({
            title,
            content,
            user: req.user._id,
        });

        res.status(201).json(note);
    }

    catch(error){

        res.status(500).json({
            message:error.message,
        });
    }
};

const getNotes = async (req,res)=>{
    try{

        const notes = await Note.find({
            user:req.user._id,
        }).sort({ createdAt: -1});

        res.status(200).json(notes);
    }
    catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const deleteNote = async (req,res)=>{
    try{

        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({
                message:"Note not found",
            });
        }

        // check ownership
        if(note.user.toString() != req.user._id.toString()){
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await note.deleteOne();

        res.status(200).json({
            message:"Note deleted successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const updateNote = async (req,res) =>{
    try{

        const { title, content } = req.body;

        const note = await Note.findById(req.params.id);

        if(!note ){
            return res.status(404).json({
                message:"Note not found ",
            })
        }

        // check ownership
        if(note.user.toString() != req.user._id.toString()){
            return res.status(401).json({
                message:"Not authorized",
            })
        }
        
        note.title = title || note.title;
        note.content = content || note.content;

        const updateNote = await note.save();
        
        res.status(200).json(updateNote);
    }

    catch(error){

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    createNote,
    getNotes,
    deleteNote,
    updateNote
}