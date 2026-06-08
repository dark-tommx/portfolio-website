const mongoose = require("mongoose");
require("dotenv").config();

const ContactInfo = require("./models/ContactInfo");
const Project = require("./models/Project");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/giridharan_portfolio";

async function seed() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });

  await ContactInfo.findOneAndUpdate(
    {},
    {
      email: "giridharan@example.com",
      description:
        "I am open to internships, web development projects, cloud computing learning opportunities, and collaborations where I can grow by building real applications."
    },
    { upsert: true, new: true }
  );

  const projectCount = await Project.countDocuments();

  if (projectCount === 0) {
    await Project.create([
      {
        title: "Personal Portfolio Website",
        description:
          "A full-stack portfolio website with project management, contact details from MongoDB, and a responsive design.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
        link: ""
      }
    ]);
  }

  console.log("Database seeded successfully");
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await mongoose.disconnect();
});
