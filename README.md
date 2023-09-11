# Image Compressor - Backend with ExpressJS

Build and run :
```bash
npm i
npm run build
npm start or npm run dev
```

Upload image :
```diff
! Method: POST
# Shape: FormData
- Parameters:
  Name: image - Type: file
  Name: quality - Type: string - Optional(If you don't send it, in server it will 60 by default)
+ Server response: a link for getting compressed image
```
Getting compressed image :
```diff
! Method: GET
# Shape: URL Parameter
- Request parameter: imageName
+ Server response: image file
@@ Request example --> your_server_adderss/imageName @@
```

Front-End : [Click Here](https://github.com/fearlessnoob/imgc-frontend)
