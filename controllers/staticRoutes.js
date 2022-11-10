const router = require("express").Router();
const { User, Blog } = require("../models/index");
const auth = require("../utils/auth");

// Homepage / browse
router.get("/", async (req, res) => {
  // Get all blogs from all users, including associated users
  const allBlogs = await Blog.findAll({
    include: [{ model: User }],
  });

  // Strip out the extra sequelize content
  const blogs = allBlogs.map((row) => row.get({ plain: true }));

  // Render the page with data needed for the handlebars template
  res.render("homepage", {
    session: req.session,
    blogs,
  });
});

// Dashboard for posting new content + seeing stats
router.get("/dashboard", auth, async (req, res) => {
  // If the user isn't logged in, send them to the login page
  if (!req.session.loggedIn) {
    res.status(304).redirect("/login");
    return;
  }

  // Get all blogs from the logged in user
  const userBlogs = await Blog.findAll({
    where: {
      id: req.session.userID,
    },
    include: [{ model: User }],
  });

  // Strip out extra sequelize content
  const blogs = userBlogs.map((row) => row.get({ plain: true }));

  // Render the page with data needed for the handlebars template
  res.render("dashboard", {
    session: req.session,
    blogs,
  });
});

// Login/signup page
router.get("/login", async (req, res) => {
  // Diagnostic logs of what's actually going to be rendered
  console.log("session: ", req.session);

  // Render the page with data needed for the handlebars template
  res.render("login", {
    session: req.session,
  });
});

// Single blog page
router.get("/blog/:id", async (req, res) => {
  // Get specified blog based on the req params
  console.log('\n**********\nblog rendering page called\n**********\n')
  const singleBlog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User }],
  });

  // Strip out extra sequelize content
  const blog = singleBlog.get({ plain: true });

  // Render the page with data needed for the handlebars template
  res.render("blog", {
    session: req.session,
    blog,
  });
});

// 404 Page
router.get("/404", async (req, res) => {
  // Diagnostic logs of what's actually going to be rendered
  console.log("session: ", req.session);

  // Render the page with data needed for the handlebars template
  res.render("404", {
    session: req.session,
  });
});

module.exports = router;
