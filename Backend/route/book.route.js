import express  from 'express'
import { getBook } from '../controller/book.controller.js'
import { searchBook } from "../controller/book.controller.js";
const router = express.Router()


router.get("/", getBook)
router.get("/search", searchBook);
export default router;
