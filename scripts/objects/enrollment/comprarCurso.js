import Utility from "/scripts/Utility.js";
document.addEventListener("DOMContentLoaded", () => { 
 var endpoint= "http://localhost/api/enrollments";
 const params = new URLSearchParams(window.location.search);
 var courseId1= params.get("curso");
 var userId1= params.get("user");

console.log("valor del curso id" + courseId1);
console.log(userId1);

	var data = {"courseId": courseId1 , "userId": userId1 };

 fetch(endpoint,{
    method: 'POST',
    body:JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
      }
    })
 	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    });

})

