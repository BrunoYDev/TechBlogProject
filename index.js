const express = require('express');
const app = express();
const connection = require('./database/database');

const categoriesController = require('./categories/categories.controller');
const articlesController = require('./articles/articles.controller');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const { where } = require('sequelize');

// Change view engine to ejs
app.set('view engine', 'ejs');

// Create static folder(for images, files etc)
app.use(express.static('public'));

// use urlEncode for EJS files
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
connection.authenticate().then(() => {
    console.log('DB connection stabilished');
}).catch((error) => {
    console.log(error);
});

// Routes:

app.get('/',(req,res) => {
    Article.findAll({
        order: [['id','desc']]
    }).then((articles) => {
        Category.findAll().then((categories) => {
            res.render('index',{articles: articles, categories: categories});
        });
    });    
});

app.get('/:slug',(req,res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        },
    }).then((article) => {
        if(article != undefined){
            Category.findAll().then((categories) => {
                res.render('article',{article: article, categories: categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch((error) => {
        res.redirect('/');
    });
});

app.get('/category/:slug',(req,res) => {
    let slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug,
        },
        include: [{model: Article}]
    }).then((category) => {
        if(category != undefined){
            Category.findAll().then((categories) => {
                res.render('index', {articles: category.articles, categories: categories})
            });
        }else{
            res.redirect('/');
        }
    }).catch((err) => {
        res.redirect('/')
    });
});

app.use('/', categoriesController);

app.use('/', articlesController);

// Initialize Server
app.listen(8080, () => {
    console.log('Server running at: http://localhost:8080');
});
