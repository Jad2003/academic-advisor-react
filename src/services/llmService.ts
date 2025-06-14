
import { pipeline, Pipeline } from '@huggingface/transformers';

interface GradeData {
  arabic: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  philosophy: number;
  economics: number;
  sociology: number;
}

export class LLMService {
  private static pipeline: Pipeline | null = null;
  private static isLoading = false;

  static async initialize(): Promise<void> {
    if (this.pipeline || this.isLoading) return;
    
    this.isLoading = true;
    try {
      console.log('Loading Llama 3.2-3B model for enhanced recommendations...');
      this.pipeline = await pipeline(
        'text-generation',
        'onnx-community/Llama-3.2-3B-Instruct',
        { 
          device: 'webgpu',
          dtype: 'fp16'
        }
      );
      console.log('LLM loaded successfully');
    } catch (error) {
      console.error('Failed to load LLM:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  static async generateEnhancedRecommendations(grades: GradeData, ruleBasedRecommendations: any[]): Promise<string> {
    if (!this.pipeline) {
      await this.initialize();
    }

    const gradeText = Object.entries(grades)
      .map(([subject, grade]) => `${subject}: ${grade}/20`)
      .join(', ');

    const ruleBasedText = ruleBasedRecommendations
      .map(rec => `${rec.major} (${Math.round(rec.match)}% match)`)
      .join(', ');

    const prompt = `You are an academic advisor for Lebanese students. Analyze these Lebanese Baccalaureate grades and provide enhanced major recommendations.

Student Grades: ${gradeText}

Rule-based analysis suggests: ${ruleBasedText}

Please provide:
1. Brief analysis of the student's academic strengths
2. 2-3 additional major suggestions with reasoning
3. Insights about the student's academic profile

Keep response concise and focused. Respond in a helpful, encouraging tone.`;

    try {
      const result = await this.pipeline(prompt, {
        max_new_tokens: 300,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false
      });

      return result[0].generated_text.trim();
    } catch (error) {
      console.error('LLM generation failed:', error);
      return "Unable to generate enhanced recommendations at this time. Please try again.";
    }
  }

  static isReady(): boolean {
    return this.pipeline !== null;
  }

  static isInitializing(): boolean {
    return this.isLoading;
  }
}
