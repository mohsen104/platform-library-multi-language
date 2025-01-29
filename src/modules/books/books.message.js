const language = process.env.LANGUAGE || 'en';

const LocalizedBooksMessages = Object.freeze({
    created: {
        en: "Book created successfully.",
        fa: "کتاب با موفقیت ایجاد شد.",
    },
    not_found: {
        en: "No book found with the provided ID.",
        fa: "کتابی با شناسه ارائه شده یافت نشد.",
    },
    edited: {
        en: "Book edited successfully.",
        fa: "کتاب با موفقیت ویرایش شد.",
    },
    removed: {
        en: "Book removed successfully.",
        fa: "کتاب با موفقیت حذف شد.",
    },
});

const BooksMessages = Object.fromEntries(
    Object.entries(LocalizedBooksMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BooksMessages;