export enum ERoutes {
  HOME = '/',
  DECISION_PICKER = '/decision-picker',
  ERROR_404 = '/404',
}

export interface ITodoItem {
  id: string;
  title: string;
  weight: string;
}
export interface IState {
  id: number;
  spinTime: number;
  wheelColors: string[];
  todos: ITodoItem[];
}

export interface ICreateElem {
  tag: keyof HTMLElementTagNameMap;
  text?: string;
  children?: (HTMLElement | keyof HTMLElementTagNameMap | string)[];
  parent?: HTMLElement | keyof HTMLElementTagNameMap | null;
  classes?: string[];
  id?: string;
  attributes?: Record<string, string>;
  style?: string;
}
export interface ISegments {
  start: number;
  end: number;
  title: string;
}
[];
