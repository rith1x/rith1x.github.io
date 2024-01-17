
      function cardmagic(){
      
         const jpg = document.getElementById('card-img');
         if (jpg.style.scale == "1"){
            jpg.style.scale = "1.7";
           jpg.style.transform = "translateY(-10%)translateX(-3%)";
           jpg.style.rotate = "15deg";
         } else {
           jpg.style.transform = "translateY(0%)translateX(0%)";
            jpg.style.scale = "1";
           jpg.style.rotate = "0deg";
         }
      }
   
   document.addEventListener('DOMContentLoaded', function () {
               const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        
    entry.target.classList.toggle('show', entry.isIntersecting);
    

    });
    });

    document.querySelectorAll('[love]').forEach((el) => observer.observe(el));
   
            });
   
   