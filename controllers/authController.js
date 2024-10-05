import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelpers.js';
import JWT from "jsonwebtoken";

//POST
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validations
        if (!name) {
            //string format
            return res.send({ error: "Name is required" });

            //JSON format
            // return res.status(404).send({
            //     success: false,
            //     message: "Name is required"
            // });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is required" });
        }
        if (!address) {
            return res.send({ message: "Address is required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is required" });
        }

        // Check if the user already exists in the database
        const existingUser = await userModel.findOne({ email });
        // If the user exists, send a response with a success status of false and a message indicating that the user is already registered
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered please login"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create a new user model with the provided details and hashed password
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();

        // Send a response with a success message and the created user
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);

        //string format
        //return res.status(500).send("Error in Register Controller");

        //JSON format
        return res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

//POST
export const loginController = async (req, res) => {
    try {
        // Destructure the email and password from the request body
        const { email, password } = req.body;
        //validations
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        // Check if the user exists in the database
        const user = await userModel.findOne({ email });
        // If the user does not exist, return a 404 status code and a message
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Check if the password matches the user's password
        const isMatch = await comparePassword(password, user.password);

        // If the password does not match, send a response with a success status of false and a message of "Invalid Password"
        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        //token
        // This line of code is used to sign a JWT token with the user's ID and a secret key, and set the expiration time to 7 days
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Send a response with a status of 200 and a JSON object containing the success message, user information, and token
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        // check
        const user = await userModel.findOne({ email, answer });
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

// test controller
export const testController = async (req, res) => {
    try {
        res.send("Protected Routes")
    }
    catch (error) {
        console.log(error);
        res.send({ error });

    }
};

// update profile
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } 
    catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
};

// orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Getting Orders",
        error,
      });
    }
  };

  // all orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Getting Orders",
        error,
      });
    }
  };
  
  // order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updating Order",
        error,
      });
    }
  };