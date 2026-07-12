require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const heroImageRoutes = require('./routes/heroImageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const videoRoutes = require('./routes/videoRoutes');
const addOnPackageRoutes = require('./routes/addOnPackageRoutes');
const packageFaqRoutes = require('./routes/packageFaqRoutes');
const packageRoutes = require('./routes/packageRoutes');
const errorHandler = require('./middleware/error');
const app = express();

const allowedOrigins = [

  "localhost:5173",
 "172.24.160.1:5173",
 "10.8.0.1:5173",
 "10.144.89.118:5173",
 "192.168.1.51:5173",
  "http://192.168.1.51:8443",
  "https://192.168.1.51:8443",
  "http://localhost:5173",
    "http://localhost:5174",
  "https://103.251.218.143:8443",
  "https://localhost:8443",
  "http://103.251.218.143:8443",
  "http://localhost:8443",
    "https://www.shrijiphotostudio.com",
  "https://shrijiphotostudio.com",
  "http://www.shrijiphotostudio.com",
  "http://shrijiphotostudio.com",
   
];
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello, World! 🎉",
    timestamp: new Date().toISOString(),
    data: {
      user: "John Doe",
      age: 25,
      email: "johndoe@example.com"
    }
  });
});
app.use('/api/auth', userRoutes);
app.use('/api/hero', heroImageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/images', imageRoutes)
app.use('/api/videos', videoRoutes);
app.use('/api/package-addons', addOnPackageRoutes);
app.use('/api/package-faqs', packageFaqRoutes);
app.use('/api/packages', packageRoutes);

app.use(errorHandler);
module.exports = app;
