const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");

const gcconfig = {
  projectId: "appx-device-manager",
  keyFilename: "appx-device-manager-firebase-adminsdk-purlf-33a0f174f6.json"
};

const gcs = require("@google-cloud/storage",gcconfig);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, ()=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if (req.method == "POST") {
      const busboy = new Busboy({ headers: res.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("appx-device-manager.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "source",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
      return res.status(200).json({
        message: "Allowed"
      });
    }
    
    busboy.end(req.rawBody);
    
  });
});
