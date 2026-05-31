const userCollection = require("../models/user");
const productCollection = require("../models/Product");
const queryCollections = require("../models/query");
const cartCollection =require("../models/cart");
const bcrypt = require("bcrypt");

const regDataController =async(req,res)=>{
    try {
    const {fName ,email ,pass}=req.body;

    if(!fName || !email || !pass){
      return res.status(400).json({message:"All feilds are required"});
    }

    const emailExit = await userCollection.findOne({userEmail :email });

    if(emailExit){
        res.status(400).json({message:"Email already register"});
    }

    const hashPassword = await bcrypt.hash(pass,10);
    
    const record = new userCollection({
     userName: fName,
    userEmail: email,
    userPass: hashPassword,
    });

    await record.save();
    res.status(200).json({message:"successfully Register"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error "})
    }
   
};

const loginDataController=async (req,res)=>{
    try {
        const {loginEmail ,loginPass} = req.body;
    const userCheck = await userCollection.findOne({userEmail:loginEmail});

    if(!userCheck){
        return res.status(400).json({message:"user Not found ....!"});
    }

    const matchPass = await bcrypt.compare(loginPass,userCheck.userPass);

    if(!matchPass){
        return res.status(400).json({message:"Invaild Credentials"});
    }
    res.status(200).json({message:"Successfully Login",data:userCheck});
    } catch (error) {
          res.status(500).json({message:"Internal Server Error "});
    }
    
}

const userAllProducts = async (req, res) => {
  try {
    const category = req.query.category || "All";
    const search = req.query.search || "";

    let filter = {
      productStatus: "In-Stock",
    };

    if (category.toLowerCase() !== "all") {
      filter.productCategory = category.toLowerCase();
    }

    if (search.trim() !== "") {
      filter.productName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const record = await productCollection.find(filter);

    res.status(200).json({ data: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userQueryController = async (req,res)=>{
    try {
        const {userName ,userEmail ,userQuery} = req.body;
    const record = new queryCollections({
    Name: userName,
    Email: userEmail,
    Query: userQuery,
    });
    await record.save();
    res.status(200).json({message:"Successfully Submit Your Query...."});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error..."});
    }
}

const saveCartController = async(req,res)=>{
    try {
     const {userId , cartItems , TotalPrice , TotalQuantity} = req.body;
    let cart = await cartCollection.findOne({userId});

    if(cart){
        cart.cartItems = cartItems;
        cart.TotalPrice = TotalPrice;
        cart.TotalQuantity =TotalQuantity;
        await cart.save();
    }else{
    cart = new cartCollection({
        userId,
        cartItems,
        TotalPrice,
        TotalQuantity,
       });
    await cart.save(); 
    }
    res.status(200).json({message:"cart save successfully"}); 
    }
     catch (error) {
        res.status(500).json({message:"internal server error..."});
    }
    
}

const getCartController = async (req,res)=>{
    try {
        const userId =req.params.userId;
        const cart = await cartCollection.findOne({userId});
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
    }
}

module.exports={
    regDataController,
    loginDataController,
    userAllProducts,
    userQueryController,
    saveCartController,
    getCartController,
};