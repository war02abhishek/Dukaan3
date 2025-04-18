
import app from "./app.js"
import dotenv from "dotenv"
// import cloudinary from "cloudinary"
import connectDatabase from  './config/database.js'

//Handling Uncaught Exception
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to Uncaught Exception')
  process.exit(1);
})



// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
   dotenv.config({ path: "backend/config/config.env" });
// }


//connnecting to database
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


const server=app.listen(process.env.PORT, () => {
  console.log("Server is running on  http://localhost:" + process.env.PORT);
});

// FOR DEPLOYMENT PURPOSE
// const PORT = process.env.PORT || 3000;
// const HOST = '0.0.0.0'; // Force listen on all IPs

// const server=app.listen(PORT, HOST, () => {
//   console.log(`Server running at http://${HOST}:${PORT}`);
// });

// console.log(youtube);
//Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise  Rejection');
  
  server.close(()=>{
    process.exit(1);
  });
});
