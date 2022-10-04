import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

const upload = multer({ dest: '../uploads/' })


router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.post('/result', upload.single('file'), async function(req, res) {
  const formData = new FormData();

  formData.append('file', fs.createReadStream(req.file.path));

  formData.append('entryYear', req.body.studentNumber);
  formData.append('department', req.body.major);

  const result = await axios.post('172.30.1.62:8088/api/v1/graduation/testparser',formData, {
    headers: {
      ...formData.getHeaders(),
    }
  })

  res.send('Birds home page');
})

export default router;