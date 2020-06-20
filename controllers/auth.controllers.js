const config = require('../conf')
const Jwt = require('jsonwebtoken')
const Google = require('googleapis')
const google = Google.google

const axios = require('axios')
const Bcrypt = require('bcrypt')
const User = require('../src/model/index')

/*******************/
/** CONFIGURATION **/
/*******************/


const defaultScope = [
  'profile', 'email',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

/*************/
/** HELPERS **/
/*************/



function createConnection() {
  return new google.auth.OAuth2(
    config.GoogleClientId,
    config.GoogleClientSecret,
    config.GoggleRedirectUrl
  );
}



function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}



/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
// const getGoogleAccountFromCode = async (code) => {
//   const auth = createConnection();
//   const data = await auth.getToken(code);
//   const tokens = data.tokens;

//   auth.setCredentials(tokens);
//   const plus = getGooglePlusApi(auth);
//   const me = await plus.people.get({ userId: 'me' });
//   const userGoogleId = me.data.id;
//   const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

//   return {
//     id: userGoogleId,
//     email: userGoogleEmail,
//     tokens: tokens
//   };
// }

//promise return 

//promise abhi resolve async await 
async function getTokenFromCode(code) {

  try {
    const auth = createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    return { result: true, data: tokens }
  }
  catch (e) {
    console.log(e)
    return { result: false, data: e }
  }

}


async function getuserInfo({ access_token }) {
  try {
    const { data } = await axios.get(`${config.GoogleInfoUrl}${access_token}`)
    return { result: true, data }
  } catch (e) {
    console.log("there is the errro", e)
    return { result: false, data: e }
  }
}

async function loginLocal(req, res, next) {
  const { email, password } = req.body

  try {
    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      res.status(400).send({ result: false, data: "email not found" })
      return;
    }
    const result = await Bcrypt.compare(password, savedUser.hashPassword);
    if (result) {
      req.user = savedUser;
      next();
    }
    else {
      res.status(400).send({ result: false, data: "Wrong  password" })
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ result: false, data: e })
  }
}
async function SignUpHandler(req, res, next) {
  const { email, password, name } = req.body;
  let fetchUser = await User.findOne({ email: email });
  if (fetchUser) {
    res.send({ result: false, data: 'Already signed up!! Please Login' })
     return
  }

  const hashPassword = Bcrypt.hashSync(password, parseInt(config.brctyptSalt));

  const user = new User({ email, hashPassword, name, source: 'local' })
  try {
    const savedUser = await user.save();
    req.user = savedUser;
    next();
  }
  catch (e) { res.status(400).send({ result: false, error: e }) }

}




async function getUser(req, res, next) {
  const { cookies } = req;
  const { jwtToken } = cookies
  console.log("user ", jwtToken)
  try {

    if (jwtToken) {

      const data = Jwt.verify(jwtToken, config.JWT_KEY)
      if (data) {
        console.log('bcjhbf')
        let fetchUser = await User.findOne(data.userId);
        res.send(fetchUser)
      }

    } else {
      return res.status(400).send({ status: false, data: "user is not logged in" })
    }

  } catch (error) {
    return res.status(200).send({ status: false, data: error })
  }

}


async function SignUpGoogle(req, res, next) {
  try {

    const code = req.query.code;
    const { result, data } = await getTokenFromCode(code);

    if (!result) return res.status(400).send({ result: false, data: data })
    const userInfo = await getuserInfo(data)
    if (!userInfo.result) res.status.send({ result: false, data: userInfo.data })
    let user = await User.findOne({ email: userInfo.data.email });
    if (user) {
      {
        res.send('<script>alert("Already signed up!! Please Login") </script>  <script> window .location="/login"</script>')

        return;
      }


    } else {
      saveGoogleUser({ email: userInfo.data.email, name: userInfo.data.name, next, req, res })
      // next()
    }


  } catch (error) {
    res.send({ result: false, data: error })
  }
}

async function LoginGoogle(req, res, next) {
  //  console.log("jcnkjnkjcnk  ",req.body)

  // try {
  //   const ans=getUser()
  //   console.log("ANS ",ans)
  //   // else{
  res.redirect(`localhost:${config.PORT}/v/google-auth`)
  //   // }

  // } catch (error) {
  //   res.send({ result: false, data: error })
  // }
}

async function saveGoogleUser({ email, name, next, req, res }) {

  let fetchUser = await User.findOne({ email });
  try {
    if (fetchUser == null) {
      const newuser = new User({ name, email, source: 'google' });
      fetchUser = await newuser.save();
      req.user = fetchUser;
      // console.log("user ", req.user)
      next()
    }
    else {

      res.redirect('localhost:3000/chat')
    }

  }
  catch (error) {
    res.send({ result: false, data: error })
  }
}


module.exports = {
  urlGoogle,
  SignUpHandler,
  loginLocal,
  getUser,
  SignUpGoogle,
  LoginGoogle

}