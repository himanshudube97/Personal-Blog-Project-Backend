import mongoose from "mongoose";

const connectDatabase = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

export default connectDatabase;


// module.exports = connectDatabase;