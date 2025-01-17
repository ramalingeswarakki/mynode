import { Router, Request, Response } from "express";
const router = Router();

interface Book{
    id:number,
    name:string,
    age:number
}

const books:Book[]=[{id:1,name:"Book1",age:30},{id:2,name:"Book2",age:15},{id:3,name:"Book3",age:20}];

//Get all books
router.get("/books",(req:Request,res:Response)=>{
res.json(books);
var basedonAge = books.sort((a,b)=>a.age-b.age);
var basedOnName = books.sort(x=>x.id);
});

//Get book by id

router.get("/books/:id",(req:Request,res:Response)=>
    {
var bookId = parseInt(req.params.id);
var basedonAge = books.sort(x=>x.age);
var basedOnName = books.sort(x=>x.id);
var book = books.find(x=>x.id === bookId);
res.json(book);
});

export default router;