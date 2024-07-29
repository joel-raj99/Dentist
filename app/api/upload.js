// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import ConnectDB from '../../lib/ConnectDB';
import Upload from '../../models/Upload';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create a multer instance
const upload = multer({ storage: storage });

// Set up the API route with next-connect
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  await ConnectDB();

  const { title, description } = req.body;
  const newUpload = new Upload({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype,
    title,
    description,
  });

  try {
    const savedUpload = await newUpload.save();
    res.status(200).json({ data: 'File uploaded successfully', file: savedUpload });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save file information' });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
