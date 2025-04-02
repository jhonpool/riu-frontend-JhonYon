export class Filter
{
    page : number = 0;
    sizePage : number = 2;
    filterValue: string ="";
    total : number = 0;

    setPageSize(size : number)
    {
        this.sizePage = size;
    }
}