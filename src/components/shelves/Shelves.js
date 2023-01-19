import React from "react";
import { useEffect, useMemo } from "react";
import { useGetBooksQuery, useUpdateBookMutation } from '../../api/apiSlice';


const Shelves = () => {
    const {
     data: books = [],
   } = useGetBooksQuery();
 const [updateBook] = useUpdateBookMutation();

 const shelves = useMemo(() => {
  const filteredBooks = books.slice();
      return filteredBooks;
}, [books]);

 useEffect(() => {  
     bindModal('.card', '.popup_engineer', '.popup_engineer .popup_close');
   });
  const onDragStart = (evt) => {
     let element = evt.currentTarget;
     element.classList.add("dragged");
     evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
     evt.dataTransfer.effectAllowed = "move";
   };
   const onDragEnd = (evt) => {
     evt.currentTarget.classList.remove("dragged");
   };
   const onDragEnter = (evt) => {
     evt.preventDefault();
     let element = evt.currentTarget;
     element.classList.add("dragged-over");
     evt.dataTransfer.dropEffect = "move";
   };
   const onDragLeave = (evt) => {
     let currentTarget = evt.currentTarget;
     let newTarget = evt.relatedTarget;
     if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
       return;
     evt.preventDefault();
     let element = evt.currentTarget;
     element.classList.remove("dragged-over");
   };
   const onDragOver = (evt) => {
     evt.preventDefault();
     evt.dataTransfer.dropEffect = "move";
   };
   const onDrop = (evt, value, newStatus) => {
     evt.preventDefault();
     evt.currentTarget.classList.remove("dragged-over");
     let data = evt.dataTransfer.getData("text/plain");
     shelves.map((shelf) => {
       if (shelf.id.toString() === data.toString()) {
        updateBook({...shelf ,status: newStatus});
           return {...shelf ,status: newStatus}
       } else {     
       return shelf;
       }
     });
   };
 
  const bindModal = (triggerSelector, modalSelector, closeSelector) => {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          intro = document.querySelector('#intro');

    trigger.forEach(item => {
        item.addEventListener('dblclick', (e) => {
            if (e.target) {
                e.preventDefault();
            }
             let showShelf = shelves.find(shelf => shelf.id === item.id)
            intro.innerHTML=`
            <img class= "pic" src='${showShelf.imgsrc}'></div>
            <div class="book-name"> ${showShelf.name} </div>
            <div class="book-author">${showShelf.author}</div>
            <div class="book-description">${showShelf.description}</div>
            `;
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    close.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = ""; 
        }
    });
}

   const shelfForBook = (classType, statusshelf, headlabel, arrBook) =>{
     return(
     <div
       className={`${classType} small-box`}
       onDragLeave={(e) => onDragLeave(e)}
       onDragEnter={(e) => onDragEnter(e)}
       onDragEnd={(e) => onDragEnd(e)}
       onDragOver={(e) => onDragOver(e)}
       onDrop={(e) => onDrop(e, false, statusshelf)}
     >
       <section className="drag_container">
       <h4>{headlabel}</h4>
         <div className="container inner-container">
           <div className="drag_column">
             <div className="drag_row">
               
               {arrBook.map((book) => (
                 <div
                 className={'card ' + book.color}
                   key={book.name}
                   id={book.id}
                   draggable
                   onDragStart={(e) => onDragStart(e)}
                   onDragEnd={(e) => onDragEnd(e)}
                 >
                   <div className="card_right">
                   <div className="name">{book.name}</div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </section>
     </div>
   );
   }
  
    
     let pending = shelves.filter((data) => data.status === "In Progress");
     let done = shelves.filter((data) => data.status === "Completed");
     let newOrder = shelves.filter((data) => data.status === "New Books");
     let waiting = shelves.filter((data) => data.status === "Favourites");
    
     return (
       <div className="container">
         <div className="shelf">
           {shelfForBook("order","New Books","New Books",newOrder)}
           {shelfForBook("pending","In Progress","In Progress",pending)}
         </div>
         <div className="shelf">
           {shelfForBook("waiting","Favourites","Favourites",waiting)}
           {shelfForBook("done","Completed","Completed",done)}
         </div>
         <div className="popup_engineer">
           <div className="popup_dialog">
             <div className="popup_content text-center">
                 <button type="button" className="popup_close"><strong>&times;</strong></button>
                 <div className="popup_form">
                     <div id="intro">                    
                     </div>
                 </div>
             </div>
           </div>
         </div>
       </div>
     );
   
 }
 
 export default Shelves;