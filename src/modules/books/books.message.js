import LocalizedBooksMessages from './books.locale.json' assert { type: "json" };

const language = process.env.LANGUAGE || 'en';

const BooksMessages = Object.fromEntries(
    Object.entries(LocalizedBooksMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BooksMessages;