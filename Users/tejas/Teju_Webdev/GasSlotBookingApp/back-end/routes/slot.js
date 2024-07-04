const slot=require("../models/Slot");
const express= require("express");
const router = express.Router();
const authMiddleware=require("../middleware/auth");
router.post('/slots',authMiddleware, checkRole(["admin"]),async(req,res)=>{
    try{ 
    const {slotId,stationname,available}=req.body;
    const newSlot = new slot ({username,stationname,slot,bookingStatus});
    await newSlot.save();
    res.json({message:"Slot created"});
   }catch(error){
res.json({message:error.message});
}
});

router.put("/slots/:slotld",authMiddleware, async (req, res)=> {
const {slotId}= req.params;
const updates = req.body;
try {
await slot.findByIdAndUpdate (slotId, updates); 
res.json({message: "Slot updated"});
} catch (error) {
    res.status(500).json({message: "Error updating slot"});
}
});

router.put("/slots/:slotld",authMiddleware, checkRole(["admin"]), async (req, res)=> {
    const {slotId}= req.params;
    try {
    await slot.findByIdAndDelete (slotId); 
    res.json({message: "Slot deleted"});
    } catch (error) {
        res.status(500).json({message: "Error deleting slot"});
    }
    });

module.exports= router;