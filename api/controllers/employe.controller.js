import Absent from "../models/Absent.model.js";
import Attend from "../models/Attend.model.js";
import Emp from "../models/Employee.js";
import { error } from "../utils/error.js";
import jwt from 'jsonwebtoken';




//add new employee
export const signup = async (req, res, next) => {
    
    const {  email, password } = req.body;
    const newUser = new Emp({
        email,
        password,
    });

    try {
        await newUser.save();
        res.json(  'Signup succes');
        
    } catch (error) {

       next(error);
        
    }
}

// singin new employee
export const signgin = async (req, res, next) => {

    const {  email, password } = req.body;

    if( !email || !password  || email === '' || password === ''){
        
       return next(error(400, 'all fields are required'));
    }

    try {
        const validUser = await Emp.findOne({ email });
        if(!validUser) {
            next(error(404, 'User not found'));
        }
        

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }


}

//get all employee
export const getemployee = async (req, res, next) => {
    try {
      
  
        const Empp = await Emp.find();
  
        if (Empp.length > 0) {
          res.json({
            message: "Employee details retrieved successfully",
            Empp,
          });
        } else {
          return next(error(404, " Employee not fonud "));
        }
     
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };


//update emloyee
  export const updateemp = async (req, res, next) => {
    
    try {
      const updateEmploye = await Emp.findByIdAndUpdate(
        req.params.EmpId,
        {
          $set: {
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      );
      res.status(200).json(updateEmploye);
    } catch (error) {
      next(error);
    }
  };


  //delete employe
  export const deleteEmp = async (req, res, next) => {
    
    try {
      await Emp.findByIdAndDelete(req.params.EmpId);
      res.status(200).json("The Employe has been deleted");
    } catch (error) {
      next(error);
    }
  };

//mark employee atendance
  export const attendance = async (req, res, next) => {
    
    const {  EmployeId, price, time } = req.body;
    const newattend = new Attend({
      EmployeId,
      price,
        time,
    });

    try {
        await newattend.save();
        res.json(  ' succes' );
        
    } catch (error) {

       next(error);
        
    }
}

// absent form submite
export const absent = async (req, res, next) => {
    
  const {  Email, Phone, desc } = req.body;
  const newabs = new Absent({
    Email,
    Phone,
    desc,
  });

  try {
      await newabs.save();
      res.json(  ' succes' );
      
  } catch (error) {

     next(error);
      
  }
}

//curret employe attendce  dipslay
export const getEmploye = async (req, res, next) => {
  try {
    const EmployeId = req.params.EmployeId; 
    
    
    const Employe = await Attend.find({ EmployeId });

    if (Employe.length > 0) {
      res.json({ message: "Item details retrieved successfully", Employe });
    } else {
      return next(error(404, " not found"));
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};


//delete all not work  
export const  deleteIAttend = async (req, res, next) => {
  try {
    const { EmployeId } = req.params;
    
    
    await Attend.deleteMany({ EmployeId });

    res.status(200).json({ message: "Attend have been deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


//get all absent 
export const getabsent = async (req, res, next) => {
  try {
    

      const ABsnt = await Absent.find();

      if (ABsnt.length > 0) {
        res.json({
          message: "Employee details retrieved successfully",
          ABsnt,
        });
      } else {
        return next(error(404, " Employee not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

// delete Absent  not work
export const deleteabsent = async (req, res, next) => {
  try {
    const deletedAbsent = await Absent.findByIdAndDelete(req.params.AbsentId);
    if (deletedAbsent.length > 0) {
     
      res.status(200).json({ message: "The Absent has been deleted" });
    }else 
    return res.status(404).json({ error: "Absent not found" });
   
  } catch (error) {
    
    next(error);
  }
};




