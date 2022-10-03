import express from 'express';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: '../uploads/' })


router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.post('/result', upload.single('file'), function(req, res) {
  console.log(req.file);
  console.log(req.body.studentNumber)
  res.send('Birds home page');
})

export default router;