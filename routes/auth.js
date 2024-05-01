const passport = require('passport');
const session = require('express-session');

module.exports = function(app){
    app.use(session({
        secret: process.env.SERVER_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

// Middleware used in protected routes to check if the user has been authenticated
    const isLoggedIn = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/google');
        }
    }


    app.get('/auth/google',
        passport.authenticate('google', {
                scope:
                    ['email', 'profile']
            }
        ));

// Call back route
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/failed',
        }),
        function (req, res) {
            res.redirect('/success');
        }
    );

// failed route if the authentication fails
    app.get("/failed", (req, res) => {
        res.send("Failed: Authentication failed please try again!")
    })

// Success route if the authentication is successful
    app.get("/success", isLoggedIn, (req, res) => {
        console.log(`[LOGIN] [SUCCESS] ${req.user.displayName} has logged in.`);
        res.send(`Welcome ${req.user.displayName}`)
    })

    app.get('/get',isLoggedIn,(req,res)=>{
        res.render('success.html', {
            displayName: req.user.displayName
        });
    });

    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.send('Error while destroying session, you may need to try again or something corrupted!')
                console.log('Error while destroying session:', err);
            } else {
                req.logout(() => {
                    console.log('You are logged out');
                    res.redirect('/home');
                });
            }
        });
    });
}