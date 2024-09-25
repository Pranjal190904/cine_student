const cors = require("cors"); 

const corsOptions = {
  origin: "https://cine24exam.netlify.app",
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

module.exports = handleCors; 
