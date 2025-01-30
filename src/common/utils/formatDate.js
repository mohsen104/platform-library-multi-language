const formatDate = (date) => {
    const locale = process.env.LANGUAGE;
    
    const options = {
        dateStyle: "full"
    };

    if (locale === "ar") {
        options.calendar = "islamic"
    };

    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export default formatDate;