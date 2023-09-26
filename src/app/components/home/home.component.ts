import { Component, OnInit } from '@angular/core';
import { TodoItem, Priority } from '../../models/todo-item.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  
export class HomeComponent implements OnInit {

  newTodo: TodoItem = {
    id: '',
    description: '',
    dueDate: new Date(),
    priority: Priority.Low,
  };

  todos: TodoItem[] = [];
  isEditing = false;
  informDescriptionWarning = false;
  showFilters = false;
  priorityFilter = '';
  descriptionFilter = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  clearData(): void {
    this.newTodo = {
      id: '',
      description: '',
      dueDate: new Date(),
      priority: Priority.Low,
    };
  }

  addTodo(): void {
    if (!this.checkDescription(this.newTodo.description)) {
      return;
    }

    const dueDate = this.newTodo.dueDate instanceof Date
    ? this.newTodo.dueDate.toISOString().split('T')[0]
    : this.newTodo.dueDate;

    const newTodo = {
      description: this.newTodo.description,
      dueDate: dueDate,
      priority: this.newTodo.priority,
    };

    this.todoService.createTodo(newTodo).subscribe((response) => {
      console.log('Todo created:', response);
      this.loadTodos();
    });
  }
  
  loadTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  editTodo(id: string, updatedTodo: any): void {
    this.todoService.editTodo(id, updatedTodo).subscribe((response) => {
      console.log('Todo updated:', response);
      this.loadTodos();
      this.isEditing = false;
    });
    
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      console.log('Todo deleted');
      this.loadTodos();
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    if (this.showFilters === false) {
      this.clearFilters();
    }
  }

  get filteredTodos(): TodoItem[] {
    return this.todos.filter((todo) => {
      const priorityMatch = !this.priorityFilter || todo.priority === this.priorityFilter;
      const descriptionMatch = !this.descriptionFilter || todo.description.toLowerCase().includes(this.descriptionFilter.toLowerCase());
      return priorityMatch && descriptionMatch;
    });
  }

  clearFilters(): void {
    this.priorityFilter = '';
    this.descriptionFilter = '';
  }

  checkDescription(description: string) {
    if (description.length === 0) {
      this.informDescriptionWarning = true;
      setTimeout(() => {
        this.informDescriptionWarning = false;
      }, 5000);
      return false;
    } else {
      this.informDescriptionWarning = false;
      return true;
    }
  }
}


