export function validateWord(str: string = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rule = /^WIP:/g;

      if (rule.test(str)) {
        reject(new Error("String contiene caracteres no validos"));
      } else {
        resolve(str);
      }
    }, 1500);
  });
}
