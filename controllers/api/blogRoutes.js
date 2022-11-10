const router = require("express").Router();
// Pull in model info from parent index file in models to descure depencencies' definitions
const { Blog } = require("../../models/index");

// Create new blog
router.post("/create", async (req, res) => {
  try {
    // Get the info needed for the new blog
    const blogBody = {
      name: req.body.name,
      description: req.body.description,
      content: req.body.content,
      date_created: Date.now(),
      user_id: req.session.userID,
    };

    // Log the info to be provided to the model
    console.log("blogBody: ", blogBody);

    // Create the new blog
    const newBlog = await Blog.create(blogBody);

    // Send confirmatory info
    res.status(200).json(newBlog);
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(400).json(err);
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    // Get all blogs
    const allBlogs = await Blog.findAll();

    // Strip out extra sequelize content
    const blogs = allBlogs.map((row) => row.get({ plain: true }));

    // Log the results
    console.log("blogs:", blogs);

    // Send confirmatory info
    res.status(200).json(blogs);
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(400).json(err);
  }
});

// Get one blog
router.get("/:id", async (req, res) => {
  try {
    // Get all blogs
    const oneBlog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Strip out extra sequelize content
    const blog = oneBlog.map((row) => row.get({ plain: true }));

    // Log the results
    console.log("blog:", blog);

    // Send confirmatory info
    res.status(200).json(blog);
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(400).json(err);
  }
});

// Update one blog
router.put("/:id", async (req, res) => {
  try {
    // Get the updated body content from the request
    const updatedContent = {
      name: req.body.name,
      description: req.body.description,
      content: req.body.content,
      date_created: Date.now(),
      user_id: req.session.userID,
    };

    // Log the content to be updated
    console.log(updatedContent);

    // Actually update the blog
    const updatedBlog = Blog.update(updatedContent, {
      where: {
        id: req.params.id,
      },
    });

    // Send confirmatory info
    res.status(200).json(updatedBlog);
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete one blog
router.delete("/:id", async (req, res) => {
  try {
    // Destroy the designated blog
    const destroyedBlog = Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Send confirmatory info
    res.status(200).json(destroyedBlog);
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
