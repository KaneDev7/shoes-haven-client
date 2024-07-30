import { MutateFonctionName, MutateStatus } from "@/types/mutate.type"
import { Status } from "@/types/product.type"

export const DELIVERIED : Status = 'deliveried'
export const CANCELLED : Status = 'cancelled'
export const PENDING : MutateStatus | Status = 'pending'
export const ERROR : MutateStatus = 'error'
export const SUCCESS : MutateStatus = 'success'

export const UPDATE_SUCCESS_MESSAGE : string = "Vos informations ont été mis à jour avec succée"
export const ERROR_MESSAGE : string = "Quelques choses s'est mal passé, réssayez plus tard"

export const CREATE_USER_CONTACT_ADDRESS: MutateFonctionName = 'creatUserContactAdress';
export const ADD_PRODUCT: MutateFonctionName = 'addProduct';
export const UPDATE_PRODUCT: MutateFonctionName = 'updateProduct';
export const DELETE_PRODUCT: MutateFonctionName = 'deleteProduct';
export const TOGGLE_STOCK: MutateFonctionName = 'toggleStock';
export const UPDATE_ORDER: MutateFonctionName = 'updateOrder';
export const CREATE_ORDER: MutateFonctionName = 'createOrder';
export const DELETE_ORDER: MutateFonctionName = 'deleteOrder';
export const ADD_TO_CART: MutateFonctionName = 'addToCart';
export const DELETE_ITEM_FROM_CART: MutateFonctionName = 'deleteItemFromCart';
export const DELETE_ALL_ITEM_FROM_CART: MutateFonctionName = 'deleteAllItemFromCart';
export const CREATE_USER: MutateFonctionName = 'createUser';
export const LOGIN: MutateFonctionName = 'login';


export const productTableHeaderList : string[] = [
    'Nom du produit',
    'Categories',
    'Prix',
    'Stock',
    'Action'
]

export const orderTableHeaderList : string[] = [
    'Clients',
    'Date',
    'Quantités',
    'Total',
    'Méthode paiement',
    'Status',
    'Action'
]

export const SIZES_DATA : number[] =  [40, 41, 42, 43, 44, 45, 46]
export const COLORS_DATA: string[] =  ["Rouge", "Vert", "Bleu", "Jeune", "Orange", "Noir", "Gris", 'Blanc', 'Maron', 'Beige']


// query parmas key
export const CATEGORY_KEY = "category"
export const COLOR_KEY =  "color"
export const SIZE_KEY =  "size"
export const MARK_KEY =  "mark"
export const SORT_PRICE = 'sort_price' 

// URL
export const BASE_URL = 'http://localhost:3000'