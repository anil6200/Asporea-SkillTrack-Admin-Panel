const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logActivity = require("../utils/logActivity")

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not Found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "50min" }
    );
    await logActivity(
      `Admin logged in (${admin.email})`
    )

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" })
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;


    const adminId = req.admin.id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Please enter Both Passwords Correctly!" });
    }


    const admin = await Admin.findById(adminId).select("+password");


    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old Password is Wrong!" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);


    admin.password = hashedNewPassword;
    await admin.save();


    await logActivity(`Admin changed password (${admin.email})`);

    res.status(200).json({ success: true, message: "Password successfully changed ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Password change failed" });
  }
};
