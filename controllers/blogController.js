
const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1}) // -1 bedeutet, dass die Reihfolge absteigend ist also von neu erstellte Blog zum Alten
    .then((result) => {
        res.render('blogs/index', {title: "All Blogs", blogs: result})
    })
    .catch((err) => {console.log(err)})
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {title: 'Blog Details', blog: result})
        })
        .catch((err) => { console.log(err)})
}


const blog_create_get = (req, res) => {
    res.render('blogs/create', {title:"Create a new Blog"})
}


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {console.log(err)})
}


const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => { // Hier kann man kein redirect machen, da wir dem Endpoint durch fetchAPI (AJAX) erreichen, und damit kann man kein Redeirct machen
            res.json({redirect:'/blogs'})
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}