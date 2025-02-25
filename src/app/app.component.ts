import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SpeechComponent } from "./components/speech/speech.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SpeechComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "speech-to-text";
}
