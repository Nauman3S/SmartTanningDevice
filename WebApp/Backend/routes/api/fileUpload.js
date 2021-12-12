// const express = require("express");
// const router = express.Router("");

// router.post("/", async (req, res) => {
//   try {
//     let file;
//     let uploadPath;
//     file = req.files.file;
//     uploadPath = __dirname + "/files/" + file.name;
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         res.status(400).send(err);
//       }
//       res.send("File Uploaded");
//     });
//     console.log(uploadPath);
//   } catch (err) {
//     console.log(err);
//   }
// });

// module.exports = router;
