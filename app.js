// const express = require('express')
// const app = express();
// const hb = require('express-handlebars')
// const homeRouter = require('./routers/homeRouter.js')
// const profileRouter = require('./routers/profileRouter.js')
// const communityRouter = require('./routers/communityRouter.js')
// const administrationRouter = require('./routers/administrationRouter.js')
// const basicAuth = require('basic-auth')
// const bodyParser = require('body-parser');
// var pg = require('pg');
// const path = require('path');


// app.use(express.static(path.join('public')));
// app.use(bodyParser.urlencoded({ extended: false }))
// // app.engine('handlebars', exphbs({defaultLayout: 'index' }));
// app.engine('handlebars', hb({defaultLayout:'main'}));
// app.set('view engine', 'handlebars');
// app.set("views", "./views")
// // app.set('view engine', exphbs);

// var config = {
//     user: 'wah',
//     database: 'social_media',
//     password: 'postgres', //whatever your password is, the default is postgres or password, try both
//     host: 'localhost',
//     port: 5432,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// }

// var client = new pg.Client(config);
// client.connect();

// const auth = function (req, res, next) {
//     function unauthorized(res) {
//         res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//         res.status(401);
//         return res.end();
//     }

//     console.log(req.headers);
//     let userInput = basicAuth(req);
//     console.log(userInput);

//     if (!userInput || !userInput.name || !userInput.pass) {
//         return unauthorized(res);
//     }
//     else {
//         client.query('SELECT * FROM users', function (err, result) {
//             if (err) {
//                 res.send(401, 'unauthorized');
//             }
//             else {

//                 let list = result.rows;
//                 console.log(list);
//                 for (let i = 0; i < list.length; i++) {
//                     if (list[i].username == userInput.name && list[i].password == userInput.pass) {

//                         req.user = list[i]
//                         console.log('check 1');
//                         return next();
//                     }
//                 }
//             }
//         })
//     }
// }

// app.use(auth)

// app.get('/', async (req,res)=>{
//     // console.log(req.user)
//     let user = await JSON.stringify(req.user.id);  //user = {"id":1,"username":"eric","password":"12345","full_name":null,"email":null,"gender":null,"date_of_birth":null,"created_at":null}// //we will use req.user in the later handler//
//     console.log('req.user'+ user );
//     // console.log(user.id)
//     res.end(user);

// })

// app.use('/home', homeRouter)
// app.use('/profile', profileRouter)
// app.use('/community', communityRouter)
// app.use('/administration', administrationRouter)


// // elvis upload
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });



// app.post('/upload', (req, res) => {
//     const upload = multer({
//         storage: storage,
//     }).single('myImage');

//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             // res.render('ji_post', {
//             //     user: req.user.id
//             // })
//             res.redirect('/profile')
//             // // console.log(req.body.comment)
//             async function insertPic(name) {
//                 var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO)VALUES  ($1, $2, $3, $4, $5) RETURNING id`;
//                 await client.query(query, [name, req.user.id, 'TRUE', 'FALSE', 'TRUE'], function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 })
//             }

//             let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`
//             // let captionImg = '' +  req.body.comment + '/' + req.file.filename ;
//             insertPic(captionImg)
//         }
//     })
// })

// app.post('/communityUpload/:id', (req, res) => {
//     const upload = multer({
//         storage: storage,
//     }).single('myImage');

//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             // res.render('ji_post', {
//             //     user: req.user.id
//             // })
//             res.redirect('/community/'+ req.params.id)
//             // // console.log(req.body.comment)
//             async function insertPic(name) {
//                 var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO,CATEGORY_ID)VALUES  ($1, $2, $3, $4, $5,$6) RETURNING id`;
//                 await client.query(query, [name, req.user.id, 'FALSE', 'FALSE', 'TRUE',req.params.id], function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 })
//             }

//             let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`
//             // let captionImg = '' +  req.body.comment + '/' + req.file.filename ;
//             insertPic(captionImg)
//         }
//     })
// })

// app.post('/uploadprofileimg', (req, res) => {
//     const upload = multer({
//         storage: storage,
//     }).single('myImage');

//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.log("file uploaded") 
//             console.log(req.file.filename)
//             console.log(req.user.id)
//             res.redirect('/profile')
//             async function insertPic(name) {
//                 var query = `update users set profilepic =$1 where id = ${req.user.id}`;
//                 // var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO,CATEGORY_ID)VALUES  ($1, $2, $3, $4, $5,$6) RETURNING id`;
//                 await client.query(query,[name] ,function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 })
//             }

//             // let captionImg = `<img width="100%" src="/uploads/${req.file.filename}">`
//             let captionImg = `/uploads/${req.file.filename}`

//             insertPic(captionImg);
//         }
//     })
//  })



// app.listen(3000);


const express = require('express')
const expressSession = require('express-session');
const app = express();
const hb = require('express-handlebars')
const homeRouter = require('./routers/homeRouter.js')
const profileRouter = require('./routers/profileRouter.js')
const communityRouter = require('./routers/communityRouter.js')
const administrationRouter = require('./routers/administrationRouter.js')
const basicAuth = require('basic-auth')
const bodyParser = require('body-parser');
var pg = require('pg');
const path = require('path');

//Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


app.use(express.static(path.join('public')));
app.use(bodyParser.urlencoded({ extended: false }))
// app.engine('handlebars', exphbs({defaultLayout: 'index' }));

//Set up Session for User authentication
app.use(expressSession({
    secret: 'thisRealSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));
app.engine('handlebars', hb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.set("views", "./views")
// app.set('view engine', exphbs);

var config = {
    user: 'wah',
    database: 'social_media',
    password: 'postgres', //whatever your password is, the default is postgres or password, try both
    host: 'localhost',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

var client = new pg.Client(config);
client.connect();

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
    async (username, password, done) => {
        try{
            let query = 'select * from users where username = $1'

            let users = await client.query(query, [username], function (err, results){
                if(err) {
                    console.log(err);
                }
        
                if(results.length == 0){
                return done(null, false, {message: 'No user exists'})
            }

            // console.log(results)
            let user = results.rows[0];
            // console.log(user)
            if(user.password === password){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect credentials'})
            }
            })
            ;
           
        } catch(err){
            return done(err);
        }
    }
));

passport.use('local-signup', new LocalStrategy(
    async (username, password, done) => {
        try{
            let query = 'select * from users where username = $1';
            let users = await client.query(query, [username], async function(err, results){
                if (results.rows.length > 0) {
            return done(null, false, { message: 'Email already taken' });
            }
            // const newUser = {
            //     username: username,
            //     password: password,
            //     email: email
            // };
            let query1 = 'insert into users (username, password) values ($1, $2) RETURNING id';
            let newUser = await client.query(query1, [username, password], function(err, results){
                if (err) {
                    console.log(err)
                }                
                // console.log(results.rows[0])

                // console.log(results)  
                return done(null, results.rows[0]);
                // return newUser
            })
            // let userId = await client.query1('users').insert(newUser).returning('id');
            // newUser.id = userId[0];
          
            })
            
        }catch(err){
            return done(err);
        }

    })
);

passport.serializeUser((user, done) => {
    // console.log(user.id)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let query = 'select * from users where id = $1'
    let users = await client.query(query, [id], function(err, results){
        
        if(err) {
            console.log(err);
        }
        if (results.rows.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
        }
        let user = results.rows[0];
        // console.log(user)
        return done(null, user);
    })
    ;
    
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

app.get('/user', isLoggedIn, (req, res)=>{
    let  user = req.user.username
     res.json(user)
     // res.render('profile', {layout:'main'})
 })

 app.get('/user/:id', isLoggedIn, (req, res)=>{
    let userID = req.params.id
     let  user = req.user.username
      res.json(userID)
     // res.render('profile', {layout:'main'})
  })

app.get('/',isLoggedIn, (req, res)=>{
    res.redirect('/home');
    console.log(req.user.id);
});

app.get('/login', (req, res)=>{
    res.render('login', {layout: false})
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess',
    failureRedirect: '/error'
}));

app.get('/signupSuccess', (req, res) => {
    res.render('signupSuccess', {layout: false});
});

app.get('/error', (req, res)=>{
    res.send('You have failed...')
});

app.get('/logout', function(req, res){
 
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    res.redirect('/');
    });

app.use('/home', homeRouter)
app.use('/profile', profileRouter)
app.use('/community', communityRouter)
app.use('/administration', administrationRouter)


// elvis upload
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



app.post('/upload', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.render('ji_post', {
            //     user: req.user.id
            // })
            res.redirect('/profile')
            // // console.log(req.body.comment)
            async function insertPic(name) {
                var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO)VALUES  ($1, $2, $3, $4, $5) RETURNING id`;
                await client.query(query, [name, req.user.id, 'TRUE', 'FALSE', 'TRUE'], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`
            // let captionImg = '' +  req.body.comment + '/' + req.file.filename ;
            insertPic(captionImg)
        }
    })
})

app.post('/communityUpload/:id', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.render('ji_post', {
            //     user: req.user.id
            // })
            res.redirect('/community/'+ req.params.id)
            // // console.log(req.body.comment)
            async function insertPic(name) {
                var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO,CATEGORY_ID)VALUES  ($1, $2, $3, $4, $5,$6) RETURNING id`;
                await client.query(query, [name, req.user.id, 'FALSE', 'FALSE', 'TRUE',req.params.id], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`
            // let captionImg = '' +  req.body.comment + '/' + req.file.filename ;
            insertPic(captionImg)
        }
    })
})


app.post('/uploadprofileimg', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("file uploaded") 
            console.log(req.file.filename)
            console.log(req.user.id)
            res.redirect('/profile')
            async function insertPic(name) {
                var query = `update users set profilepic =$1 where id = ${req.user.id}`;
                // var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO,CATEGORY_ID)VALUES  ($1, $2, $3, $4, $5,$6) RETURNING id`;
                await client.query(query,[name] ,function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            // let captionImg = `<img width="100%" src="/uploads/${req.file.filename}">`
            let captionImg = `/uploads/${req.file.filename}`

            insertPic(captionImg);
        }
    })
 })


app.listen(3000);