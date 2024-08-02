import { BaseEntity ,Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity("customer")
export class Customer extends BaseEntity {
    static findIndex(arg0: (customer: any) => boolean) {
        throw new Error("Method not implemented.")
    }
    static splice(bookIndex: any, arg1: number) {
        throw new Error("Method not implemented.")
    }
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:255})
    name: string

    @Column({length:255 , unique:true})
    mobilePhone: string

    @Column()
    balance: number

   
}