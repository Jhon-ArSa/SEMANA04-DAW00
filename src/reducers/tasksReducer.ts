export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface TasksState {
  items: Task[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'date' | 'priority' | 'name';
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { title: string; priority: Task['priority'] } }
  | { type: 'REMOVE_TASK'; payload: { id: number } }
  | { type: 'TOGGLE_TASK'; payload: { id: number } }
  | { type: 'SET_FILTER'; payload: { filter: TasksState['filter'] } }
  | { type: 'SET_SORT'; payload: { sortBy: TasksState['sortBy'] } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'LOAD_TASKS'; payload: { tasks: Task[] } };

/**
 * Reducer function para manejar el estado complejo de tareas
 * Implementa inmutabilidad usando spread operator
 */
export function tasksReducer(state: TasksState, action: TaskAction): TasksState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        priority: action.payload.priority,
        createdAt: new Date().toISOString()
      };
      
      return {
        ...state,
        items: [...state.items, newTask]
      };
    }

    case 'REMOVE_TASK':
      return {
        ...state,
        items: state.items.filter(task => task.id !== action.payload.id)
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        items: state.items.map(task =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        items: state.items.filter(task => !task.completed)
      };

    case 'LOAD_TASKS':
      return {
        ...state,
        items: action.payload.tasks
      };

    default:
      return state;
  }
}

export const initialTasksState: TasksState = {
  items: [],
  filter: 'all',
  sortBy: 'date'
};
