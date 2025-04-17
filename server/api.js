module.exports = (db) => {
  const loginUser = async (req, res) => {
    // Your login logic here
  };

  const registerUser = async (req, res) => {
    // Your registration logic here
  };

  const addNote = async (req, res) => {
    try {
      const { title, content, category } = req.body;

      // Check if all required fields are provided
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required." });
      }

      // Insert the note into the database
      await db.none(
        "INSERT INTO notes (title, content, category) VALUES ($1, $2, $3)",
        [title, content, category]
      );

      res.status(201).json({ message: "Note added successfully." });
    } catch (error) {
      console.error("Error adding note:", error); // Log the error
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  };

  // const getNotes = async (req, res) => {
  //     try {
  //         const notes = await db.any("SELECT * FROM notes ORDER BY created_at DESC");
  //         res.json({
  //             status: "success",
  //             data: notes,
  //         });
  //     } catch (error) {
  //         res.status(500).json({
  //             message: "Internal server error.",
  //             error: error.message,
  //         });
  //     }
  // };
  const getNotes = async (req, res) => {
    console.log("GET /api/getNotes called");
    try {
      const notes = await db.any("SELECT * FROM notes");
      console.log("Notes retrieved:", notes);
      res.json(notes);
    } catch (err) {
      console.error("❌ Error in getNotes route:", err);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  };

  const updateNote = async (req, res) => {
    const { id, title, content } = req.body;
    try {
      await db.none(
        "UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3",
        [title, content, id]
      );
      res.json({
        status: "success",
        message: "Note updated successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error.",
        error: error.message,
      });
    }
  };

  const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
      await db.none("DELETE FROM notes WHERE id = $1", [id]);
      res.json({
        status: "success",
        message: "Note deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error.",
        error: error.message,
      });
    }
  };

  return {
    loginUser,
    registerUser,
    getNotes,
    addNote,
    updateNote,
    deleteNote,
  };
};
