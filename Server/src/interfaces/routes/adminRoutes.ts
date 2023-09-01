import { Router } from "express";
import adminAuth from "../../adapters/middlewares/adminAuth";
import postLoginRouter from "./adminRoutes/postLogin";
import postLogoutRouter from "./adminRoutes/postLogout";
import getAllUsersRouter from "./adminRoutes/getAllUsers";
import blockUserRouter from "./adminRoutes/blockUserRouter";
import unblockUserRouter from "./adminRoutes/unblockUserRouter";
import { getReports,deletePost } from "./adminRoutes/reportsRouter";

const adminRouter=Router()





adminRouter.post('/login',postLoginRouter)
adminRouter.post('/logout',postLogoutRouter)
adminRouter.get('/allUsers',adminAuth,getAllUsersRouter)
adminRouter.patch('/blockUser/:id',adminAuth,blockUserRouter)
adminRouter.patch('/unblockUser/:id',adminAuth,unblockUserRouter)
adminRouter.get('/reports',adminAuth,getReports)
adminRouter.delete('/posts/:id/:reportId',adminAuth,deletePost)





export default adminRouter