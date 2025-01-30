const language = process.env.LANGUAGE || 'en';

const LocalizedBorrowedMessages = Object.freeze({
    not_user_id: {
        en: "No user found with the provided ID.",
        fa: "کاربری با شناسه ارائه شده یافت نشد.",
        ar: "لم يتم العثور على مستخدم بالمعرف المقدم.",
        tr: "Sağlanan kimliğe sahip kullanıcı bulunamadı.",
        fr: "Aucun utilisateur trouvé avec l'ID fourni.",
    },
    not_book_id: {
        en: "No book found with the provided ID.",
        fa: "کتابی با شناسه ارائه شده یافت نشد.",
        ar: "لم يتم العثور على كتاب بالمعرف المقدم.",
        tr: "Sağlanan kimliğe sahip kitap bulunamadı.",
        fr: "Aucun livre trouvé avec l'ID fourni.",
    },
    recorded: {
        en: "Borrowing record created successfully.",
        fa: "رکورد قرضی با موفقیت ایجاد شد.",
        ar: "تم إنشاء سجل الاستعارة بنجاح.",
        tr: "Ödünç alma kaydı başarıyla oluşturuldu.",
        fr: "Enregistrement de l'emprunt créé avec succès.",
    },
    returned: {
        en: "Book returned successfully.",
        fa: "کتاب با موفقیت بازگشت داده شد.",
        ar: "تم إعادة الكتاب بنجاح.",
        tr: "Kitap başarıyla iade edildi.",
        fr: "Le livre a été retourné avec succès.",
    },
});

const BorrowedMessages = Object.fromEntries(
    Object.entries(LocalizedBorrowedMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BorrowedMessages;
