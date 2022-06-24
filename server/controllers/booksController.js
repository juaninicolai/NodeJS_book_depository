import Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
          res.status(500).json({error: 'Could not fetch the documents'});
    };
};

// export const getBookById = async (req, res) => {
//     try {
//         const books = await Book.findById(req.params.id);
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({error: 'Could not fetch the documents'});
//     }
// };

// export const createBook = async (req, res) => {
//     try {
//         const book = await Book.create(req.body);
//         res.status(201).json(book);
//     } catch (error) {
//         res.status(500).json({error: 'Could not create the document'});
//     }
// };

// export const updateBook = async (req, res) => {
//     try {
//         const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         res.status(200).json(book);
//     } catch (error) {
//         res.status(500).json({error: 'Could not update the document'});
//     }
// };

// export const deleteBook = async (req, res) => {
//     try {
//         await Book.findByIdAndDelete(req.params.id);
//         res.status(204).json({message: 'Document deleted'});
//     } catch (error) {
//         res.status(500).json({error: 'Could not delete the document'});
//     }
//};

export default Book;
