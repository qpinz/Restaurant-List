const express = require("express")
const exphbs = require("express-handlebars")
const restaurantsData = require("./restaurant.json").results

const app = express()
const port = 3000

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))

// index page
app.get("/", (req, res) => {
  res.render("index", { restaurantsData })
})

// search restaurants by keyword
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantsData = restaurantsData.filter(
    data =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render("index", { restaurantsData: filterRestaurantsData, keywords })
})

// show page
app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = restaurantsData.find(
    data => data.id === Number(restaurantId)
  )
  res.render("show", { restaurantData })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})