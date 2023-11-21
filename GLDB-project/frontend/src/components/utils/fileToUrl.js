export function fileToUrl(file) {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find(type => type === file.type);

    if (!valid) {
        throw TypeError('File is not png, jpg, or jpeg');
    }

    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });

    reader.readAsDataURL(file);
    return promise;
}