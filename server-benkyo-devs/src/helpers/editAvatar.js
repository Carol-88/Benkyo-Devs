const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const saveAvatar = async (image) => {
    const uploadsPath = path.join(__dirname, '..', process.env.UPLOADS_DIR);
    try {
        await fs.access(uploadsPath);
    } catch {
        await fs.mkdir(uploadsPath);
    }

    const sharpImage = sharp(image.data);

    sharpImage.resize(300);

    const imageName = `${uuid()}.jpg`;

    const imagePath = path.join(uploadsPath, imageName);

    await sharpImage.toFile(imagePath);

    return imageName;
};

const deleteAvatar = async (imageName) => {
    try {
        const imagePath = path.join(__dirname, '..', process.env.UPLOADS_DIR, imageName);
        try {
            await fs.access(imagePath);
        } catch (error) {
            console.error('access error:', error);
            return;
        }

        await fs.unlink(imagePath);
    } catch (error) {
        generateError('Error al eliminar la imagen del servidor');
    }
};

module.exports = {
    saveAvatar,
    deleteAvatar,
};
