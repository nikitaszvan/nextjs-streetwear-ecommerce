export const makeSlug = (str: string) => str.split(" ").map((str) => str.toLowerCase()).join('-');

export const generateConfirmationNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
};

export const formatDate = (dateString: string | undefined): string | null => {
    if (!dateString) {
        return null;
    }

    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
        return null;
    }

    return dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const makeTitleCase = (str: string) => {
    return str.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}