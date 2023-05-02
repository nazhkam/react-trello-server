import express from "express";
import mongoose from "mongoose";
import cors from "cors";



import handleValidErrors from "./utils/handleValidErrors.js";
import { registerValidation, loginValidation, blockValidations, noteValidations, doneNoteValidations } from './validations.js'



import { login, register, getMe } from "./controllers/UserController.js";
import IsAuth from "./utils/IsAuth.js";
import { addBlock, addNote, getBlocks, removeBlock, doneNote } from "./controllers/BlockController.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.ipemiwx.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log("db ok")
    })
    .catch((err) => console.log('error', err))

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hi World')
});


app.post('/auth/login', loginValidation, handleValidErrors, login)
app.post('/auth/register', registerValidation, handleValidErrors, register)
app.get('/auth/getme', IsAuth, handleValidErrors, getMe)
app.get('/blocks', IsAuth, handleValidErrors, getBlocks)
app.post('/blocks/add', IsAuth, blockValidations, handleValidErrors, addBlock)
app.patch('/blocks/addNote', IsAuth, noteValidations, handleValidErrors, addNote)

app.patch('/blocks/doneNote', IsAuth, doneNoteValidations, handleValidErrors, doneNote)

app.delete('/blocks/remove/:id', IsAuth, removeBlock)





app.listen(4445, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("server ok")
}) 