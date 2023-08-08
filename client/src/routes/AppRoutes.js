
import Increment from '../Component/Increment';
import { ROUTES } from '../utils/routes';
import ToDoList from '../Component/ToDoList'
import LogOut from '../Component/LogOut';
import { ROLES } from "../utils/constants";


export const PROTECTED_ROUTES = [
    {
      id: 1,
      path: ROUTES.PROTECTED_ROUTES_NAMES.root,
      element:<LogOut/>,
      role:[ROLES.PURCHASER,ROLES.SELLER]

    },
    {
      id: 2,
      path: ROUTES.PROTECTED_ROUTES_NAMES.increment,
      element: <Increment/>,
      role:[ROLES.PURCHASER,ROLES.SELLER],

    },
    {
      id: 3,
      path: ROUTES.PROTECTED_ROUTES_NAMES.todolist,
      element: <ToDoList/>,
      role:[ROLES.PURCHASER,ROLES.SELLER],
    },
    {
      id:4,
      path:ROUTES.PROTECTED_ROUTES_NAMES.purchaser,
      element:<h1>Purchaser Page</h1>,
      role:[ROLES.PURCHASER],

    },
    {
      id:5,
      path:ROUTES.PROTECTED_ROUTES_NAMES.seller,
      element:<h1>Seller Page</h1>,
      role:[ROLES.SELLER],
    }
]