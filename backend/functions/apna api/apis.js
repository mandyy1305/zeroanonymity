const admin = require("firebase-admin");
const db = admin.firestore();

const postReq = {
    sendData (req, res) {
        db.collection("users").add({
        first: req.body.first,
        last: req.body.last,
        born: 1815
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            return res.status(200).send({docRef: docRef.id});
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            return res.status(500).send("Something dailes");
        });
    }
};

const getReq = {
    
}

module.exports = {postReq, getReq};
