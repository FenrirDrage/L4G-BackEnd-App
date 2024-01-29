const { Event } = require("../models/models.js"); // Import your Event model

(exports.getAllEvents = async (req, res) => {
  console.log(req.loggedInUser);
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}),
  // Get a specific event by ID
  (exports.getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }),
  // Get a specific event by Name
  (exports.getEventByName = async (req, res) => {
    const eventName = req.params.name;

    try {
      const event = await Event.findOne({ name: eventName });
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get a specific event by nameGame
exports.getEventByNameGame = async (req, res) => {
  const eventNameGame = req.params.nameGame;

  try {
    const event = await Event.findOne({ nameGame: eventNameGame });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const {
    name,
    date,
    hour,
    local,
    ageLimit,
    description,
    usereg,
    nameGame,
    thumbnailGame,
    discordAccount,
  } = req.body;

  try {
    // Check if an event with the same name already exists
    const existingEvent = await Event.findOne({ name });

    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "Event with the same name already exists" });
    }

    // If no matching event is found, create a new one
    const event = new Event({
      name,
      date,
      hour,
      local,
      ageLimit,
      description,
      usereg,
      nameGame,
      thumbnailGame,
      discordAccount,
    });

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an event by ID
(exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}),
  // Delete an event by ID
  (exports.deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Delete an event by Name
exports.deleteEventByName = async (req, res) => {
  const eventName = req.params.name;

  try {
    const deletedEvent = await Event.findOneAndDelete(eventName);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
