export const makeSlug = (str: string) => str.split(" ").map((str) => str.toLowerCase()).join('-');

export const generateConfirmationNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  };