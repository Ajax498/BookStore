import Contact from "../model/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Contact saved!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
