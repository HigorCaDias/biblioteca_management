export interface PaginationParams {
    limit: number;
    offset: number;
    page: number;
  }
  
  export const getPagination = (page: number, size: number): PaginationParams => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset, page };
  };
  
  export const getPagingData = (data: any, page: number, limit: number) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, items, totalPages, currentPage };      
  };
  