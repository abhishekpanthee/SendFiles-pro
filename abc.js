const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const API_KEY = '2ca2420c-8d97-4963-b7e5-4d7cce7f95ec';
async function uploadFile(filePath) {
  try {
    const fileName = filePath.split('/').pop();
    const url = `https://pixeldrain.com/api/file/${encodeURIComponent(fileName)}`;

    const fileStream = fs.createReadStream(filePath);
    const headers = {
      Authorization: `Basic ${Buffer.from(`:${API_KEY}`).toString('base64')}`, // Basic Auth
      'Content-Type': 'application/octet-stream',
    };

    const response = await axios.put(url, fileStream, { headers });

    if (response.status === 201) {
      console.log('File uploaded successfully:', response.data);
      return response.data.id; // Return file ID for future use
    } else {
      console.log('Failed to upload file:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
}


// Main function
(async () => {
  const filePath = 'fff3.txt'; // Replace with your file path

  // Upload the file
  const fileId = await uploadFile(filePath);
})();
