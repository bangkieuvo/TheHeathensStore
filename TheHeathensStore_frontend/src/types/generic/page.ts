interface PageMetadata{
    size:number;
    number:number;
    totalElements:number;
    totalPages:number;
}
export interface Page<T>{
    page: PageMetadata;
    content:T[];
}