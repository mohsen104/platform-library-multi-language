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
    already_borrowed: {
        en: "This book has already been borrowed.",
        fa: "این کتاب قبلاً قرض گرفته شده است.",
        ar: "تم استعارة هذا الكتاب بالفعل.",
        tr: "Bu kitap zaten ödünç alınmış.",
        fr: "Ce livre a déjà été emprunté.",
    },
    already_returned: {
        en: "This book has already been returned.",
        fa: "این کتاب قبلاً بازگردانده شده است.",
        ar: "تم إعادة هذا الكتاب بالفعل.",
        tr: "Bu kitap zaten iade edilmiş.",
        fr: "Ce livre a déjà été retourné.",
    },
});

const BorrowedMessages = Object.fromEntries(
    Object.entries(LocalizedBorrowedMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BorrowedMessages;
