import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  @Input() user: User | null = null;
}
