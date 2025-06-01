const Slot = require('../models/slot');

exports.createSlot = async (req,res)=>{
    const {date,startTime,endTime} = req.body;
    console.log('Creating slot with data:', { date, startTime, endTime });
    try {
        const newSlot = new Slot({
            date,
            startTime,
            endTime,
            providerId: req.user.userId
        
        });
        await newSlot.save();
        res.status(201).json({ message: 'Slot created successfully', slot: newSlot });
    } catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSlots = async (req, res) => {
    try {
        const slots = await Slot.find({ providerId: req.user.userId }).populate('providerId', 'name email');
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSlot = async (req, res) => {
    const { slotId } = req.params;
    const { date, startTime, endTime } = req.body;

    try {
        const updatedSlot = await Slot.findByIdAndUpdate(
            slotId,
            { date, startTime, endTime }
        );

        if (!updatedSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        res.status(200).json({ message: 'Slot updated successfully', slot: updatedSlot });
    } catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSlot = async (req, res) => {
    const { slotId } = req.params;
    try {
        const deletedSlot = await Slot.findByIdAndDelete(slotId);

        if (!deletedSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// for user to see all available unbooked slots
exports.getAvailableSlots = async (req, res) => {
    try {
        const slots = await Slot.find({ isBooked: false }).populate('providerId', 'name email');
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
