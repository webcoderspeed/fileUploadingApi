### File Uploading Api
> A dynamic file uploading api which allows you to upload file of any mimetype and you can also set dynamic file upload path by just setting the enivornment variables as show below:

###### Enviroment Variables (.env file)
      MONGO_URI = mongodb://localhost/upload
      MIME_TYPES = image/png,image/jpeg,video/mp4
      PORT = 3000
      UPLOAD_PATH = uploads