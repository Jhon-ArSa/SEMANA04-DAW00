import { useReducer, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { tasksReducer, initialTasksState, type Task } from '../reducers/tasksReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import './Dashboard.css';

export default function Dashboard() {
  // ========== ARQUITECTO DE ESTADO: useReducer ==========
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);
  
  // ========== INGENIERO DE EFECTOS: useLocalStorage (Hook Personalizado) ==========
  const [savedTasks, setSavedTasks] = useLocalStorage<Task[]>('dashboard-tasks', []);

  // ========== UI LOCAL: useState ==========
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [searchQuery, setSearchQuery] = useState('');

  // ========== OPTIMIZADOR: useRef para auto-focus ==========
  const inputRef = useRef<HTMLInputElement>(null);

  // ========== OPTIMIZADOR: useDebounce (Hook Personalizado) ==========
  const debouncedSearch = useDebounce(searchQuery, 300);

  // ========== INGENIERO DE EFECTOS: useEffect para sync con localStorage ==========
  useEffect(() => {
    // Cargar tareas guardadas al montar
    if (savedTasks.length > 0 && state.items.length === 0) {
      dispatch({ type: 'LOAD_TASKS', payload: { tasks: savedTasks } });
    }
  }, []); // Solo al montar

  useEffect(() => {
    // Guardar tareas cuando cambien (con cleanup)
    if (state.items.length > 0) {
      setSavedTasks(state.items);
    }

    // Cleanup: se ejecuta antes del próximo efecto o al desmontar
    return () => {
      console.log('Cleanup: sincronizando últimos cambios');
    };
  }, [state.items, setSavedTasks]);

  // ========== OPTIMIZADOR: useMemo para lista filtrada y ordenada ==========
  const processedTasks = useMemo(() => {
    console.log('🔄 Recalculando tareas filtradas y ordenadas (useMemo)');
    
    // 1. Filtrar por estado
    let filtered = state.items;
    if (state.filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // 2. Filtrar por búsqueda (con debounce)
    if (debouncedSearch) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // 3. Ordenar
    const sorted = [...filtered].sort((a, b) => {
      if (state.sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (state.sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else { // 'name'
        return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [state.items, state.filter, state.sortBy, debouncedSearch]);

  // ========== OPTIMIZADOR: useCallback para handlers estables ==========
  const handleAddTask = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          title: newTaskTitle.trim(),
          priority: newTaskPriority
        }
      });
      setNewTaskTitle('');
      setNewTaskPriority('medium');
      
      // useRef: auto-focus en input después de agregar
      inputRef.current?.focus();
    }
  }, [newTaskTitle, newTaskPriority]); // Dependencias necesarias

  const handleToggleTask = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id } });
  }, []); // Sin dependencias porque dispatch es estable

  const handleRemoveTask = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_TASK', payload: { id } });
  }, []);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  // Estadísticas calculadas
  const stats = useMemo(() => ({
    total: state.items.length,
    active: state.items.filter(t => !t.completed).length,
    completed: state.items.filter(t => t.completed).length
  }), [state.items]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📋 Dashboard de Gestión de Tareas</h1>
        <p className="subtitle">Estado complejo con useReducer + Optimización con useMemo/useCallback</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Activas</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completadas</div>
        </div>
      </div>

      {/* Formulario para agregar tareas */}
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          ref={inputRef} // useRef: auto-focus
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nueva tarea... (useRef auto-focus)"
          className="task-input"
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
          className="priority-select"
        >
          <option value="low">🟢 Baja</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🔴 Alta</option>
        </select>
        <button type="submit" className="btn btn-primary">
          <i className="ri-add-line"></i> Agregar
        </button>
      </form>

      {/* Búsqueda con debounce */}
      <div className="search-box">
        <i className="ri-search-line"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar tareas... (useDebounce 300ms)"
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>
            <i className="ri-close-line"></i>
          </button>
        )}
      </div>

      {/* Controles de filtro y ordenamiento */}
      <div className="controls">
        <div className="filter-group">
          <label>Filtrar:</label>
          <button
            className={`filter-btn ${state.filter === 'all' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'all' } })}
          >
            Todas
          </button>
          <button
            className={`filter-btn ${state.filter === 'active' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'active' } })}
          >
            Activas
          </button>
          <button
            className={`filter-btn ${state.filter === 'completed' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'completed' } })}
          >
            Completadas
          </button>
        </div>

        <div className="sort-group">
          <label>Ordenar:</label>
          <select
            value={state.sortBy}
            onChange={(e) => dispatch({ type: 'SET_SORT', payload: { sortBy: e.target.value as any } })}
            className="sort-select"
          >
            <option value="date">📅 Fecha</option>
            <option value="priority">⚡ Prioridad</option>
            <option value="name">🔤 Nombre</option>
          </select>
        </div>

        <button className="btn btn-danger" onClick={handleClearCompleted}>
          <i className="ri-delete-bin-line"></i> Limpiar Completadas
        </button>
      </div>

      {/* Lista de tareas procesadas (useMemo) */}
      <div className="tasks-list">
        {processedTasks.length === 0 ? (
          <div className="empty-state">
            <i className="ri-task-line"></i>
            <p>{searchQuery ? 'No se encontraron tareas' : 'No hay tareas. ¡Agrega una nueva!'}</p>
          </div>
        ) : (
          processedTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)} // useCallback
                className="task-checkbox"
              />
              <div className="task-content">
                <span className="task-title">{task.title}</span>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                    {task.priority}
                  </span>
                  <span className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                className="btn-remove"
                onClick={() => handleRemoveTask(task.id)} // useCallback
                aria-label="Eliminar tarea"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Información técnica */}
      <div className="tech-info">
        <h3>🔧 Hooks Utilizados:</h3>
        <ul>
          <li><code>useReducer</code> - Estado complejo con actions: ADD, REMOVE, TOGGLE, FILTER, SORT</li>
          <li><code>useMemo</code> - Lista filtrada/ordenada (se recalcula solo cuando cambian dependencias)</li>
          <li><code>useCallback</code> - Handlers estables para evitar re-renders innecesarios</li>
          <li><code>useRef</code> - Auto-focus en input sin causar re-render</li>
          <li><code>useEffect</code> - Sincronización con localStorage + cleanup</li>
          <li><code>useLocalStorage</code> - Hook personalizado para persistencia</li>
          <li><code>useDebounce</code> - Hook personalizado para búsqueda optimizada</li>
        </ul>
      </div>
    </div>
  );
}
