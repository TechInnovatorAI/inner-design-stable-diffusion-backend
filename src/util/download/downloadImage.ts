const path = require('path')
const https = require('https')
const fs = require('fs')
const dirPath = path.join(__dirname, '/pics');

console.log('dirPath', dirPath);

export interface PathInterface {
  path: string;
}

const DownloadImage = async (url: string, filename: string) => {
  const path: PathInterface = await _downloadImage(url, dirPath, filename);
  return path;
};

async function _downloadImage(
  url: string,
  dir: string,
  filename: string,
): Promise<PathInterface> {
  return new Promise<PathInterface>((resolve, reject) => {
    const filepath = dir + '\\' + filename + '.png';
    const file = fs.createWriteStream(filepath); //dir + filename + '.png'
    const request = https.get(url, function (response) {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', function () {
          file.close();
          resolve({ path: filepath });
        });
      } else {
        file.close();
        fs.unlinkSync(dir + filename + '.png'); // Delete the file if download failed
        reject(new Error('Failed to download image'));
      }
    });

    request.on('error', function (err) {
      fs.unlinkSync(dir + filename + '.png'); // Delete the file if download failed
      reject(err);
    });
  });
}

export default DownloadImage;
