export interface SettingsModel {
    language: Language;
    dateFormat: DateFormat;
}

export enum DateFormat {
    YYYYMMDD = 'YYYY/MM/DD',
    DDMMYYYY = 'DD/MM/YYYY',
}

export enum Language {
    ENG = 'English',
    UA = 'Ukrainian',
    DE = 'German',
}