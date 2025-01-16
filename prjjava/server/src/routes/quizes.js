import express from 'express';
import { QuizModel } from '../models/Quizes.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const quizzes = await QuizModel.find({});
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching quizzes", error: err });
    }
});

router.get('/byCategory/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const quizzes = await QuizModel.find({ category: category });
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching quizzes by category", error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const newQuiz = new QuizModel(req.body);
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (err) {
        res.status(500).json({ message: "Error creating new quiz", error: err });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedQuiz = await QuizModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuiz);
    } catch (err) {
        res.status(500).json({ message: "Error updating quiz", error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await QuizModel.findByIdAndRemove(id);
        res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting quiz", error: err });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await QuizModel.distinct("category");
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err });
    }
});

router.get('/randomByCategory/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const randomQuestion = await QuizModel.aggregate([
            { $match: { category: new RegExp(category, 'i') } }, 
            { $sample: { size: 1 } } 
        ]);

        if (randomQuestion.length) {
            res.json(randomQuestion[0]); 
        } else {
            res.status(404).json({ message: "No questions found for this category" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching random quiz question", error: err });
    }
});
export default router;
