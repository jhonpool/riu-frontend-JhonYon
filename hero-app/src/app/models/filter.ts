export class Filter
{
    page : number;
    pageSize : number;
    filterValue: string ="";
    total : number;

    constructor(page : number = 0, pageSize : number = 5, total: number =0)
    {   
        this.page = page;
        this.pageSize = pageSize;
        this.total = total
    }
}