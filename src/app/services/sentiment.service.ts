import { Injectable } from "@angular/core";
import * as toxicity from "@tensorflow-models/toxicity";

interface Prediction {
  label: string;
  results: Array<{ match: boolean }>;
}

@Injectable({
  providedIn: "root",
})
export class SentimentService {
  private model: any;

  async loadModel() {
    if (!this.model) {
      const labels = ["identity_attack", "insult", "threat", "toxicity"]; // List of toxicity labels
      this.model = await toxicity.load(0.9, labels);
    }
  }

  async analyzeSentiment(text: string): Promise<string> {
    await this.loadModel();
    const predictions: Prediction[] = await this.model.classify([text]);

    let result = "Neutral";
    predictions.forEach((prediction) => {
      if (prediction.results[0].match) {
        result = "Negative";
      }
    });

    return result;
  }
}
