import { IState, ITodoItem } from '../types/types.ts';

export const appState = (() => {
  const state: IState = {
    id: 0,
    spinTime: 5000,
    wheelColors: [],
    todos: [{ id: '#1', title: '', weight: '' }],
  };

  return {
    setState: <K extends keyof IState>(key: K, value: IState[K]): void => {
      state[key] = value;
    },

    setAllState: (newState: Partial<IState>): void => {
      Object.entries(newState).forEach(([key, value]) => {
        if (key in state) {
          (state as any)[key] = value;
        }
      });
    },

    getState: <K extends keyof IState>(key: K): IState[K] => state[key],

    getAllState: (): IState => ({ ...state }),

    addTodo: (todo: ITodoItem): void => {
      state.todos.push(todo);
    },

    removeTodo: (id: string): void => {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    updateTodo: (id: string, newData: Partial<ITodoItem>): void => {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        Object.assign(todo, newData);
      }
    },
  };
})();
