export interface Todo {
  id: number;
  name: string;
  done?: boolean; // Cuando lleva el interrogante, significa que es opcional, en caso contrario obligatorio
  isEditing?: boolean;
}
