const express = require("express");
const ContactInfo = require("../models/ContactInfo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();

    if (!contact) {
      contact = await ContactInfo.create({
        email: "giridharan@example.com",
        description:
          "I am open to internship opportunities, beginner-friendly full-stack projects, and cloud computing learning collaborations."
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Unable to load contact details" });
  }
});

module.exports = router;
