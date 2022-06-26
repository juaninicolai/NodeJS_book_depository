import Book from '../models/Book.js';

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
          res.status(500).json({error: 'Could not fetch the documents'});
    };
    next();
};

export const goToCheckout = async (req, res) => {
    res.status(200).send();
}

export const reduceInventory = async (req, res) => {
    const soldBooks = req.body;  
    try {
        for (let book of soldBooks.books) {
            const bookToReduce = await Book.findById(book._id);
            bookToReduce.inventory = bookToReduce.inventory - 1;
            await bookToReduce.save();
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).json({error: 'Could not reduce the inventory'});
    }
};

export default Book;
