import LocalizedUsersMessages from './users.locale.json' assert { type: "json" };

const language = process.env.LANGUAGE || 'en';

const UsersMessages = Object.fromEntries(
    Object.entries(LocalizedUsersMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default UsersMessages;
