import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { PromptsRoutingModule } from './prompts-routing.module';
import { PromptsComponent } from './prompts.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UseComponent } from './use/use.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    PromptsComponent,
    UseComponent,
    ChatComponent,
    MessageComponent
  ],
  exports: [
    UseComponent
  ],
    imports: [
        CommonModule,
        PromptsRoutingModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        ClipboardModule,
        MatDividerModule
    ]
})
export class PromptsModule { }
