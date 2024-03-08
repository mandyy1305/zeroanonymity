const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("./node_modules/express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const {postReq, getReq} = require("./apna api/apis")

//api references
app.post("/api/create", postReq.sendData);

exports.app = functions.https.onRequest(app);
