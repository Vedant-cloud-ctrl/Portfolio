export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum NavItem {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  ABOUT = 'ABOUT',
  TERMINAL = 'TERMINAL'
}