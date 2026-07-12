const multer = require('multer');
const path = require('path');
const fs = require('fs');

const getStorage = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, `../uploads/${folder}`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().split('T')[0]; 
        const originalName = file.originalname
            .split('.')[0]
            .replace(/\s+/g, '-')
            .toLowerCase();

        const unique = Math.round(Math.random() * 1e9);

        cb(null, `${date}-${originalName}-${unique}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase())
        && allowed.test(file.mimetype);
    valid ? cb(null, true) : cb(new Error('Only image files are allowed'));
};

// Upload 2 fields: mobile + desktop
const heroUpload = multer({ storage: getStorage('hero'), fileFilter });
const imageUpload = multer({ storage: getStorage('images'), fileFilter });
const catUpload = multer({ storage: getStorage('categories'), fileFilter });

module.exports = { heroUpload, imageUpload, catUpload };