const language = process.env.LANGUAGE || 'en';

const LocalizedUsersMessages = Object.freeze({
    created: {
        en: "User created successfully.",
        fa: "کاربر با موفقیت ایجاد شد.",
        ar: "تم إنشاء المستخدم بنجاح.",
        tr: "Kullanıcı başarıyla oluşturuldu.",
        fr: "Utilisateur créé avec succès.",
    },
    not_found: {
        en: "No user found with the provided ID.",
        fa: "کاربری با شناسه ارائه شده یافت نشد.",
        ar: "لم يتم العثور على مستخدم بالمعرف المقدم.",
        tr: "Sağlanan kimliğe sahip kullanıcı bulunamadı.",
        fr: "Aucun utilisateur trouvé avec l'ID fourni.",
    },
    edited: {
        en: "User edited successfully.",
        fa: "کاربر با موفقیت ویرایش شد.",
        ar: "تم تعديل المستخدم بنجاح.",
        tr: "Kullanıcı başarıyla düzenlendi.",
        fr: "Utilisateur modifié avec succès.",
    },
    removed: {
        en: "User removed successfully.",
        fa: "کاربر با موفقیت حذف شد.",
        ar: "تمت إزالة المستخدم بنجاح.",
        tr: "Kullanıcı başarıyla silindi.",
        fr: "Utilisateur supprimé avec succès.",
    },
    existing: {
        en: "User already exists.",
        fa: "کاربر از قبل وجود دارد.",
        ar: "المستخدم موجود بالفعل.",
        tr: "Kullanıcı zaten mevcut.",
        fr: "L'utilisateur existe déjà.",
    },
});

const UsersMessages = Object.fromEntries(
    Object.entries(LocalizedUsersMessages).map(([key, value]) => [key, value[language] || value.en])
);

export default UsersMessages;
