module.exports = {
    includes: [
        'tsconfig.json'
    ], // The directories and files that need to be included are all included by default
    excludes: [], // All directories and files to be excluded are removed by default
    defaultExcludes: [// Directory and files excluded by default
        '.git',
        '.vscode',
        'node_modules',
        'package.json',
        'package-lock.json',
        'yarn-lock.json',
        'count.output.json',
    ],
    defaultExcludesFileType: [// File types excluded by default
        '.zip','.rar','.png','.jpg','.jpeg','.gif','.bmp','.mp3','.wma','.wav', '.mp4','.flv','.mov','.avi','.wmv','.rmvb','.ogg','.avi','.ppt','.pptx', '.doc','.docx','.xls','.xlsx','.psd','.ttf','.fon','.exe','.msi',
    ],
    output:'count.output.json', // The default output result file
    outputTrace: '', // Configure the file for outputting trace results, not output by default
    encodings: [// Supported file encodings, will be ignored for unsupported files
        'ascii',
        'utf8',
        'utf-8',
        'unicode'
    ],
    ignoreEmptyLine: false,
};