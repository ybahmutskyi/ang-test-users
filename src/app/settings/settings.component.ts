import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsModel } from '@app/shared/models/settings.model';
import { SettingsService } from '@app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;

  public languages: string[] = ['English', 'Ukrainian', 'German'];
  public dateFormats: string[] = ['YYYY/MM/DD', 'DD/MM/YYYY'];

  public constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    ) {
    // Initialize the form
    this.settingsForm = this.fb.group({
      language: ['', Validators.required],
      dateFormat: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    const settings: SettingsModel = this.settingsService.getSettings();
    this.settingsForm.patchValue({
      language: settings.language,
      dateFormat: settings.dateFormat,
    });
  }

  public onSubmit(): void {
    if (this.settingsForm.valid) {
      const settings: SettingsModel = this.settingsForm.value;
      this.settingsService.setSettings(settings);
    }
  }
}
