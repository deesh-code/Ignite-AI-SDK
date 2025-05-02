export interface Plan {
  thoughts: string;
  tool?: {
    name: string;
    args: Record<string, any>;
  };
}

export interface Action {
  toolOutput?: string;
  finalAnswer?: string;
}

export interface AgentStep {
  plan: Plan;
  action: Action;
}

export interface Tool {
  name: string;
  description: string;
  execute: (args: Record<string, any>) => Promise<string>;
}
