const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MjNlZDM3NS0wYjNjLTQwYTYtOTM3Yy05ZDBmYWNmNTM3NDgiLCJlbWFpbCI6ImFhbWlyc29oYWlsOTIxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWJhYTUzOWNiNTA4ZjNjMmFjNTMiLCJzY29wZWRLZXlTZWNyZXQiOiJlY2ZiNjAyZGU0NWQ2M2U0YjQzY2JhNjNjNGM1ZWU5Njk0MTIyZDUyYzAwYjJmOGI2M2JiN2VkYTE2MjVhYzUxIiwiaWF0IjoxNzE0NjcwNjMwfQ.QD_yf39JwQKQFTZEovaTUI0c8mZXjxb3Ih4fWY9RjOE

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "/home/abdullah/Pictures/Screenshots/Screenshot from 2024-02-14 19-51-03.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
