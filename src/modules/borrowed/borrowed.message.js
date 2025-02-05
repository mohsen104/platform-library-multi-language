import LocalizedBorrowedMessages from './borrowed.locale.json' with { type: "json" };

const language = process.env.LANGUAGE || 'en';

const BorrowedMessages = Object.fromEntries(
    Object.entries(LocalizedBorrowedMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BorrowedMessages;
