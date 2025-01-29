const language = process.env.LANGUAGE || 'en';

const LocalizedBooksMessages = Object.freeze({
    created: {
        en: "Book created successfully.",
        fa: "کتاب با موفقیت ایجاد شد.",
        ar: "تم إنشاء الكتاب بنجاح.",
        tr: "Kitap başarıyla oluşturuldu.",
        fr: "Livre créé avec succès.",
    },
    not_found: {
        en: "No book found with the provided ID.",
        fa: "کتابی با شناسه ارائه شده یافت نشد.",
        ar: "لم يتم العثور على كتاب بالمعرف المقدم.",
        tr: "Sağlanan kimliğe sahip kitap bulunamadı.",
        fr: "Aucun livre trouvé avec l'ID fourni.",
    },
    edited: {
        en: "Book edited successfully.",
        fa: "کتاب با موفقیت ویرایش شد.",
        ar: "تم تعديل الكتاب بنجاح.",
        tr: "Kitap başarıyla düzenlendi.",
        fr: "Livre modifié avec succès.",
    },
    removed: {
        en: "Book removed successfully.",
        fa: "کتاب با موفقیت حذف شد.",
        ar: "تمت إزالة الكتاب بنجاح.",
        tr: "Kitap başarıyla silindi.",
        fr: "Livre supprimé avec succès.",
    },
});

const BooksMessages = Object.fromEntries(
    Object.entries(LocalizedBooksMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default BooksMessages;