import { creatUserContactAdress } from "./user";
import { addProduct, deleteProduct, toggleStock, updateProduct } from "./products";
import { DeleteOrder, createOrder, updateOrder } from "./orders";
import { addToCart, deleteAllItemFromCart } from "./cart";
import { createUser, login } from "./authentification";
import { MutationOption } from "@/hooks/useMutatationHook";

export const executeMutateFonction = async (data: any, {
    fonctionName,
    token,
    status,
    id,
}: MutationOption
) => {
    switch (fonctionName) {
        case 'creatUserContactAdress':
            return creatUserContactAdress(data, token as string)
        case 'createOrder':
            return createOrder(data, token as string)
        case 'updateOrder':
            return updateOrder(data, token as string)
        case 'deleteOrder':
            return DeleteOrder(data , token as string )
        case 'updateProduct':
            return updateProduct(data,  id as string , token as string)
        case 'addProduct':
            return addProduct(data, token as string)
        case 'deleteProduct':
            return deleteProduct(data , token as string)
        case 'toggleStock':
            return toggleStock(id as string, status, token as string)
        case 'deleteAllItemFromCart':
            return deleteAllItemFromCart(token)
        case 'addToCart':
            return addToCart(data, token as string)
        case 'createUser':
            return createUser(data)
        case 'login':
            return login(data)
        default:
            break;
    }
}