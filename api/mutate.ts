import { MutateFonctionName } from "@/types/mutate.type";
import { creatUserContactAdress } from "./user";
import { addProduct, deleteProduct, toggleStock, updateProduct } from "./products";
import { Status } from "@/types/product.type";
import { DeleteOrder, createOrder, updateOrder } from "./orders";
import { deleteAllItemFromCart } from "./cart";
import { createUser, login } from "./authentification";

export const executeMutateFonction = async (
    fonctionName: MutateFonctionName,
    token: string = '' ,
    data: any = null,
    status?: Status,
    id?: string
) => {
    switch (fonctionName) {
        case 'creatUserContactAdress':
            return creatUserContactAdress(token, data)
        case 'createOrder':
            return createOrder(data, token)
        case 'updateOrder':
            return updateOrder(data, token)
        case 'deleteOrder':
            return DeleteOrder(token, data)
        case 'updateProduct':
            return updateProduct(data, token, id as string)
        case 'addProduct':
            return addProduct(data, token)
        case 'deleteProduct':
            return deleteProduct(token, data)
        case 'toggleStock':
            return toggleStock(token, data, status)
        case 'deleteAllItemFromCart':
            return deleteAllItemFromCart(token)
        case 'createUser':
            return createUser(data)
        case 'login':
            return login(data)
        default:
            break;
    }
}