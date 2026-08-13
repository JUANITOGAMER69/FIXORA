import multer from "multer";

// Guardamos en memoria (NO en disco)
const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {

        fileSize: 5 * 1024 * 1024 // 5MB

    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [

            "image/jpeg",

            "image/png",

            "image/jpg",

            "application/pdf"

        ];

        if (!allowedTypes.includes(file.mimetype)) {

            return cb(new Error("Formato de archivo no permitido"), false);

        }

        cb(null, true);

    }

});

export default upload;