const language = process.env.LANGUAGE || 'en';

const LocalizedUsersMessages = Object.freeze({
    created: {
        en: "User created successfully.",
        fa: "کاربر با موفقیت ایجاد شد.",
    },
    not_found: {
        en: "No user found with the provided ID.",
        fa: "کاربری با شناسه ارائه شده یافت نشد.",
    },
    edited: {
        en: "User edited successfully.",
        fa: "کاربر با موفقیت ویرایش شد.",
    },
    removed: {
        en: "User removed successfully.",
        fa: "کاربر با موفقیت حذف شد.",
    },
});

const UsersMessages = Object.fromEntries(
    Object.entries(LocalizedUsersMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default UsersMessages;
