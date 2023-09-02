import { Router } from "express";

import signupRouter from "./userRoutes/signUp";
import loginRouter from "./userRoutes/userLogin";
import logoutRouter from "./userRoutes/logout";
import profileRouter from "./userRoutes/profile";
import  { editProfile } from "./userRoutes/usersRouter";
import upload from "../../adapters/middlewares/upload";
import userAuth from "../../adapters/middlewares/userAuth";
import { createPost, deletePost, editPost,updateLike,getPost,postComment,putCommentLike,deleteCommentRoute,putEditComment,postReport } from "./userRoutes/postRoutes";
import { followUnfollow } from "./userRoutes/followRoutes";



const userRouter= Router()

userRouter.post('/signup',signupRouter)
userRouter.post('/login',loginRouter)
userRouter.post('/logout',logoutRouter)
userRouter.get('/profile/:id',userAuth,profileRouter)
userRouter.patch('/users/:id',userAuth,upload.single('file'),editProfile)
userRouter.post('/post',userAuth,upload.single('file'), createPost)
userRouter.put('/posts/:id',userAuth,editPost)
userRouter.delete('/posts/:id',userAuth,deletePost)
userRouter.put('/posts/:id/like',userAuth,updateLike)
userRouter.get('/posts/:id',userAuth,getPost)
userRouter.post('/posts/:id/comment',userAuth,postComment)
userRouter.put('/posts/:postId/comments/:commentId/like',userAuth,putCommentLike)
userRouter.delete('/posts/:postId/comments/:commentId',userAuth,deleteCommentRoute)
userRouter.put('/posts/:postId/comments/:commentId',userAuth,putEditComment)
userRouter.post('/posts/:id/report',userAuth,postReport)
userRouter.post('/users/:id/follow',userAuth,followUnfollow)






export default userRouter
