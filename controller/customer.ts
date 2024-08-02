import { Response , Request } from "express";
import { Customer } from "../db/entities/Customer";
import { AppError } from "../errors/AppErrors";
import customer from "../routes/customer";


const createCustomer = async (customerFromPostman: Customer) => {

        const existingCustomer = await Customer.findOne({ where: { mobilePhone: customerFromPostman.mobilePhone } });

        if (existingCustomer) {
            throw new AppError("Customer already exists", 409, true);
        }

        const customer  = new Customer ;
        customer.name = customerFromPostman.name;
        customer.mobilePhone = customerFromPostman.mobilePhone;
        customer.balance = customerFromPostman.balance;
         customer.save() ;
    }

    const removeCustomer = async (id:number)=>{
        const customer = await Customer.findOne({ where:{id:id }})
    
        if(!customer){
            throw new AppError("customer not found ", 404, true)
        }
    
        return customer.remove()
    }

    const editcustomer = async (id:number, payload:Customer)=>{
        const customer = await Customer.findOne({ where:{id:id }})
    
        if(!customer){
            throw new AppError("customer not found ", 404, true)
        }
    
        if(payload.name){
            customer.name = payload.name
        }
    
        if(payload.mobilePhone){
            customer.mobilePhone = payload.mobilePhone
        }

        if(payload.balance){
            customer.balance = payload.balance
        }


    
        return customer.save()
        
    }
   
const getCustomer = async(customerId :any)=>{
    const customer = await Customer.findOne({where:{id : customerId}})

    if(!customer){
        throw new AppError("customer not found" ,404 , true)
       
    }
    return customer
}
const getAllCustomers = async (req : Request , res : Response)=>{
     const customer = await Customer.find()

     res.json({
        message: "getting all customer successfully" ,
        status: true,
        customer :customer
     })

}
export {createCustomer , getAllCustomers , getCustomer , removeCustomer , editcustomer} 
