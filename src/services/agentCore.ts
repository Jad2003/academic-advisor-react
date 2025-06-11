
// Core AI Agent Architecture based on instructor's examples
export interface AgentSensors {
  sense(environment: any): any;
}

export interface AgentActuators {
  act(action: any, environment: any): void;
}

export interface AgentKnowledgeBase {
  store(key: string, value: any): void;
  retrieve(key: string): any;
  getContext(): any;
}

export interface AgentBrain {
  think(inputData: any): any;
  policy(inputData: any): string;
}

export class SimpleKnowledgeBase implements AgentKnowledgeBase {
  private memory: Map<string, any> = new Map();
  private conversationHistory: any[] = [];

  store(key: string, value: any): void {
    this.memory.set(key, value);
    this.conversationHistory.push({ key, value, timestamp: Date.now() });
  }

  retrieve(key: string): any {
    return this.memory.get(key);
  }

  getContext(): any {
    return {
      memory: Object.fromEntries(this.memory),
      history: this.conversationHistory.slice(-10) // Keep last 10 interactions
    };
  }
}

export abstract class BaseAgent {
  protected knowledgeBase: AgentKnowledgeBase;
  
  constructor() {
    this.knowledgeBase = new SimpleKnowledgeBase();
  }

  abstract sense(environment: any): any;
  abstract think(inputData: any): any;
  abstract act(action: any, environment: any): void;
  
  // Main agent loop
  run(environment: any): any {
    // Sensor phase: collect input from environment
    const sensorData = this.sense(environment);
    
    // Brain/Reasoning phase: process input and decide action
    const action = this.think(sensorData);
    
    // Actuator phase: take action to affect environment
    this.act(action, environment);
    
    return action;
  }
}
