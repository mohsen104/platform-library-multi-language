const formatCurrency = (number) => {
    const locale = process.env.LANGUAGE;

    const data = {
        en: {
            format: "en-US",
            currency: "USD"
        },
        fa: {
            format: "fa-IR",
            currency: "IRR"
        },
        ar: {
            format: "ar-SA",
            currency: "SAR"
        },
        tr: {
            format: "tr-TR",
            currency: "TRY"
        },
        fr: {
            format: "fr-FR",
            currency: "EUR"
        }
    };

    const options = {
        style: 'currency',
        currency: data[locale].currency
    };

    return new Intl.NumberFormat(data[locale].format, options).format(number);
}

export default formatCurrency;