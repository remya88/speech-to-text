import { Injectable, NgZone } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpeechService {
  recognition: any;
  isListening = false;
  text = "";

  constructor(private zone: NgZone) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";

      this.recognition.onresult = (event: any) => {
        this.zone.run(() => {
          this.text = event.results[0][0].transcript;
          this.isListening = false;
        });
      };

      this.recognition.onerror = () => {
        this.zone.run(() => {
          this.isListening = false;
        });
      };
    }
  }

  startListening() {
    if (this.recognition) {
      this.text = "";
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition) {
      this.isListening = false;
      this.recognition.stop();
    }
  }
}
