import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SentimentService } from "../../services/sentiment.service";
import { SpeechService } from "../../services/speech.service";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-speech",
  templateUrl: "./speech.component.html",
  styleUrls: ["./speech.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class SpeechComponent {
  sentiment = "";
  isLoading = false;

  constructor(
    public speechService: SpeechService,
    private sentimentService: SentimentService
  ) {}

  async analyzeSpeech() {
    this.isLoading = true;
    this.sentiment = await this.sentimentService.analyzeSentiment(
      this.speechService.text
    );
    this.isLoading = false;
  }
}
