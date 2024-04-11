import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MessageService } from '../_services/message.service';

export const hubGuard: CanDeactivateFn<unknown> = (component) => {
  const messageService = inject(MessageService);
  messageService.disconnectFromHub();
  return true;
};
