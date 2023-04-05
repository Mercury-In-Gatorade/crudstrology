const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
const { User, seeder } = require('../database/index.js');

const { config } = require('dotenv');
config();
const { Configuration, OpenAIApi } = require('openai');
// const readline = 'readline';
const configuration = new Configuration({
  organization: 'org-JR8ScrqlOZ2ISfjTgxxFSqu8',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


require('dotenv').config();
const { SERVER_SESSION_SECRET } = process.env;

const { Internal } = require('./internal.js');
const { External } = require('./external.js');

require('./auth.js');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
app.use(session({ secret: SERVER_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', External);
app.use('/db', Internal);

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

//openAI test request:

app.get('/crystal-ball', async (req, res) => {
  //console.log('this is what the request body looks like for the openAI GET request: ', req.body);
  await openai.createChatCompletion({
    model: req.body.model,
    messages: [{ role: req.body.messages[0].role, content: req.body.messages[0].content }],
  })
    .then(({ data }) => {
      // openAIResponse = data.choices[0].message;
      // console.log('this is the response from the then statement: ', data.choices[0].message);
      res.status(200).send(data.choices[0].message);
    })
    .catch(err => {
      console.error('an error occurred with the POST request to openai: ', err);
      res.sendStatus(500);
    });
});


// react home view*
app.get('/', (req, res) => {
  res.end();
});

// routes to google login page
app.get('/login', (req, res) => {
  // href needs to be '/auth/google'
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// <-- PASSPORT DOCS
app.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ), (req, res) => {
    // console.log('app.get(/auth/google) passport.authenticate server/index.js req :', req);
  });

// <-- shoddy logged in auth/object -->
let loggedInUser;
const loggedInSessions = {};
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // console.log('REQ', req.user);
    loggedInUser = req.user[0].dataValues;
    if (!loggedInSessions[loggedInUser.googleId]) {
      loggedInSessions[loggedInUser.googleId] = {
        name: loggedInUser.name,
        sessionID: req.sessionID,
        dob: loggedInUser.dob,
        sign: loggedInUser.sign
      };
    }
    // console.log('Logged-In-Sessions OBJECT', loggedInSessions);
    res.redirect('/');
  }
);

// passing res.send(req.user) inside this endpoint becomes undefined.. 'fixed' w/ loggedInUser
app.get('/auth/user', (req, res) => {
  res.send(loggedInUser);
});

// <-- END PASSPORT DOCS

//patch User entry in DB with user input DOB
app.patch('/user/:googleId', (req, res) => {
  //console.log('req.body: ', req.body);
  const { googleId } = req.params;
  User.update(req.body, {
    where: {
      googleId: googleId
    },
    returning: true
  })
    .then((response) => {
      //console.log('response: ', response);
      User.findAll({
        where: {
          googleId: loggedInUser.googleId
        }
      })
        .then((response) => {
          // update user entry with new sign? may work on client side
          res.status(200).send(response);
        })
        .catch((err) => {
          console.log('failed to find user after updating DOB', err);
        });
    })
    .catch((err) => {
      console.log('update user error:', err);
      res.sendStatus(500);
    });
});

(async () => {
  // <-- build seed script and call seeder() in that file...
  await seeder();
})();

// <-- SERVER WILDCARD -->
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: http://localhost:${PORT}`);
});
