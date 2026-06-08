const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

function checkPassword(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD || "portfolio123";
  const { password } = req.body;

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  next();
}

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Unable to load projects" });
  }
});

router.post("/", checkPassword, async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;

    const project = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies)
        ? technologies
        : String(technologies || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      link
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Please fill all required project details" });
  }
});

router.delete("/:id", checkPassword, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete this project" });
  }
});

module.exports = router;
