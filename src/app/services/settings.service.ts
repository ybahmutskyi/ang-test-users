import { Injectable } from '@angular/core';
import { DateFormat, Language, SettingsModel } from '../shared/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public getSettings(): SettingsModel {
    return {
      language: (localStorage.getItem('language') || "English") as Language,
      dateFormat: (localStorage.getItem('dateFormat') || DateFormat.DDMMYYYY) as DateFormat
    };
  }
  public setSettings(settings: SettingsModel): void {
    localStorage.setItem('language', settings.language);
    localStorage.setItem('dateFormat', settings.dateFormat);
  }

  constructor() { }
}
