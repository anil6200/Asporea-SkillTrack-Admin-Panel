require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("./models/admin.model");

const seedAdmin = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URL);   //connect to DB
    console.log("DB connected");

    
    const existingAdmin = await Admin.findOne({        //check if admin already exists
      email: "admin@asporea.com"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    
    const hashedPassword = await bcrypt.hash("admin@123", 10);    //hash password

    
    await Admin.create({             // create admin
      email: "admin@asporea.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error(" Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
