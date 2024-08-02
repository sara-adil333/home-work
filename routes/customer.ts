import { NextFunction, Router } from "express";
import { Express } from "express";
import { Request , Response } from "express";
import { createCustomer, editcustomer, getAllCustomers, getCustomer, removeCustomer } from "../controller/customer";
import { Customer } from "../db/entities/Customer";
import { AppError } from "../errors/AppErrors";

const router = Router() ;


router.post('/create', async (req :Request, res:Response, next:NextFunction) => {
    try {
        const { name, mobilePhone, balance } = req.body;

        if (!name || !mobilePhone || balance === undefined) {
            throw new AppError("Missing required fields", 400, true);
        }

        const newCustomerData = { name, mobilePhone, balance };
        const customer = await createCustomer(newCustomerData as Customer);

        res.status(201).json({
            message: "Customer created successfully",
            customer
        });
    } catch (error) {
        next(error);
    }
});

router.get("/" , getAllCustomers)

router.get("/:id", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const customerId = Number(req.params.id)
        const customer = await getCustomer(customerId)

        console.log("entered");
        res.json({
                    customer:customer
                })

       
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number (req.params.id);

    try {
        const customer = await removeCustomer(id)

        res.json({
            messege:"customer deleted successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.put("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number (req.params.id);
    const payload :Customer = req.body;

    try {
        const customer = await editcustomer(id, payload)

        res.json({
            messege:"customer edited successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
}) 


 export default router