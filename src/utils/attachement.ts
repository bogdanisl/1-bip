export const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'pdf':
            return "picture-as-pdf";
        case 'doc':
        case 'docx':
            return "description";
        case 'image':
        case 'png':
        case 'jpg':
        case 'webp':
            return "image";
        case 'rar':
        case 'zip':
            return "folder-zip";
        case 'excel':
        case 'xlsx':
            return "grid-on";
        default:
            return "insert-drive-file";
    }
};
