require('dotenv').config();

const express =require('express');
const fs = require('fs');
const expressLayouts =require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB =require('./db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');
const signupRoutes = require('./routes/signupRoutes');
const signinRoutes = require('./routes/signinRoutes');
const User = require('./models/User');
const bcrypt = require("bcrypt");

const app =express();
const port = 3000 || process.env.PORT;

app.use(session({
    secret:' Secret Keyboard',
    resave: false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie:{maxAge:new Date(Date.now()+ (3600000) )}
    // Date.now() -30*24*60*60*1000
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

// connect to Database
connectDB();

// //static Files
app.use(express.static('script.js'));
app.use(express.static('style.css'));


// // Templating Engine
 app.use(expressLayouts);
//app.set('ejs');
app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'view'));



// Link routes to controllers
// app.use(signupRoutes);
app.use(signinRoutes);
app.use('/', signupRoutes);



// Serve CSS and JavaScript files without the public folder
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});


app.use('/img', express.static(path.join(__dirname, 'img')));

// Index.html
app.get('/', (req, res) => {
    const filePath = path.join(__dirname,  '/view/index.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});

// shop.html
app.get('/shop', (req, res) => {
    const filePath = path.join(__dirname,  '/view/shop.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});



// about.html
app.get('/about', (req, res) => {
    const filePath = path.join(__dirname,  '/view/about.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});
// blog.html
app.get('/blog', (req, res) => {
    const filePath = path.join(__dirname,  '/view/blog.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});
// Cart.html
app.get('/cart', (req, res) => {
    const filePath = path.join(__dirname,  '/view/cart.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});
// contact.html
app.get('/contact', (req, res) => {
    const filePath = path.join(__dirname,  '/view/contact.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});
// signin.html
app.get('/signin', (req, res) => {
    const filePath = path.join(__dirname,  '/view/signin.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});
// signup.html
app.get('/signup', (req, res) => {
    const filePath = path.join(__dirname,  '/view/signup.ejs');
    
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        res.send(htmlContent);  
    });
});


app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required fields" });
    }

    try {
        const data = {
            email: email,
            password: password
        };

        // Add user
        const userdata = await User.create(data);
        console.log(userdata);
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



//Handle 404
app.get('*',function(req,res){
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('404')

})




app.listen(port,() =>{
console.log(`App listening on port ${port}`);
});