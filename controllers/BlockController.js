import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import BlockModel from '../models/BlockNotes.js'

export const addBlock = async (req, res) => {


    try {
        const name = req.body.name;
        const doc = new BlockModel({
            blockNotes: {
                name,
                notes: []
            },
            user: req.userId
        })

        await doc.save();
        res.json({ message: "added" })
    } catch (error) {
        console.log(error)
        res.json(error)

    }


}
export const getBlocks = async (req, res) => {



    const userId = req.userId
    const blocks = await BlockModel.find({ user: userId })
    const blockNotes = blocks.map((item) => { return item.blockNotes })
    const blockId = blocks.map((item) => { return item._id })
    let configureBlock = []
    
    for (let i = 0; i < blocks.length; i++) {
        const item = {
            blockNotes: blockNotes[i],
            blockId: blockId[i]
        }
        configureBlock.push(item)
    }
    

    if (configureBlock) {
        res.json({ configureBlock })
    } else {
        res.json({ message: "ошибука" })
    }

}

export const addNote = async (req, res) => {


    try {
        const blockId = req.body.blockId;
        const newNote = {
            value: req.body.note.value,
            statusDone: req.body.note.statusDone,
        }
        const finded = await BlockModel.findOne({ _id: blockId })

        await BlockModel.updateOne(
            {
                _id: blockId,
            },
            {
                blockNotes: {
                    name: finded.blockNotes?.name,
                    notes: [...finded.blockNotes.notes, newNote]
                }
            }

        )

        res.json({ finded })
    } catch (error) {
        console.log(error)
        res.json(error)

    }


}
export const removeBlock = async (req, res) => {

    try {
        const blockId = req.params.id;

        await BlockModel.findOneAndDelete(
            {
                _id: blockId
            }
        )


        res.json({ Message: 'success' })

    } catch (error) {
        res.status(500).json({ message: "Не удалось удалить блок" })
    }
}


export const doneNote = async (req, res) => {


    try {
        const blockId = req.body.blockId;
        const noteId = req.body.noteId;

        const finded = await BlockModel.findOne({ _id: blockId })

        const findedNote = finded.blockNotes.notes[noteId]

        const newNote = {
            value: findedNote.value,
            statusDone: !findedNote.statusDone,
        }


        const arr = finded.blockNotes.notes
        arr.splice(noteId, 1, newNote)
        await BlockModel.updateOne(
            {
                _id: blockId,
            },
            {
                blockNotes: {
                    name: finded.blockNotes?.name,
                    notes: [...arr]
                }
            }

        )

        res.json({ message: 'Запись Изменена' })
    } catch (error) {
        console.log(error)
        res.json(error)

    }


}