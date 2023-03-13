export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

export interface Pagination {
    next: string;
    prev: string;
    last: string;
}
