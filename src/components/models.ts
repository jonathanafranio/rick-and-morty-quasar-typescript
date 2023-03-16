export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

export interface PaginationType {
    next: string;
    prev: string;
    last: string;
}

export interface SearchFilter {
    key: string;
    value: string;
}
