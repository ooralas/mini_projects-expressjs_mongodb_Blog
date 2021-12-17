const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const app = express()

//connect to MongoDB
const dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI)
.then((result) => {
    console.log("connected to DB")
    app.listen(3000) // Da wir erstmal mit dem Datenbank verbunden werden und nur dann zu den Requeste listenen, daher packen wir das in dem then-Block, um sicher zu sein, dass unser Anwendung wird nur aktive sein, wenn die Connection zum DB erfolgreich wae 
})
.catch((err) => {console.log(err)})

//register view engine
app.set('view engine', 'ejs') //by default ejs wird nach Veiws in dem Ordner /views suchen app.set('views','myviews') falls man Views woanders liegen möchte, dann mit diesem Syntax
//Middleware
//Static Middleware
app.use(express.static('public'))  //Wenn man auf einer bestimmten Datei zugreifen will, dann einfach in der src attribute: /[dateiname], dann sucht Express nach der Datei automatisch in der Public-Ordner, ohne dass man den expilzit hinweisen
app.use(express.urlencoded({ extended: true}))

//3rd Party middleware
app.use(morgan('tiny'))

//Own Middleware
// app.use((req, res, next) => {
//     console.log("New request made")
//     console.log("host: ", req.hostname)
//     console.log("path: ", req.path)
//     console.log("method: ", req.method)
//     next();
// })


//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "new Blog 2",
//         snippet: "about my new Blog",
//         body: "more about my new Blog"
//     })

//     blog.save()
//         .then((resulte) => {
//             res.send(resulte)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err)=> {console.log(err)})
// })


// app.get('/single-blog', (req, res)=> {
//     Blog.findById('61867c6c1ba4a9e0b8780c25')
//         .then((resulte) => {
//             res.send(resulte)
//         })
//         .catch((err) => {console.log(err)})
// })


//Routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title:"About"})
})


//Blog Routes
app.use('/blogs', blogRoutes)

//404 dieses Middleware muss am Ende der app.js liegen, denn es wird immer  ausgeführt, falls keine passende Routes oben gefunden wrid
app.use((req, res) => {
    res.status(404).render('404', {title:"404"})
})
