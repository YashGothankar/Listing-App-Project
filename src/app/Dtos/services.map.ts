export type Service = 'EMPLOYEE' | 'DEPARTMENT';

export type Color = "info" | "danger" | "success" | "warning" | "primary" | "secondary";

export interface Message {
    message: string;
    color: Color
}

export interface Search {
    search: string
}
