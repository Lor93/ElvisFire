import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent | undefined;

  messages!: Observable<any[]>;
  newMsg = '';

  constructor(private chatservice: ChatService, private router: Router) { }

  ngOnInit() {
    this.messages = this.chatservice.getChatMessages();
  }

  sendMessages()
  {
    this.chatservice.addChatMessage(this.newMsg).then(() => {
      this.newMsg = ' ';
      this.content?.scrollToBottom();
    });
  }

  signOut()
  {
    this.chatservice.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

}
