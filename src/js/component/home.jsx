import React, { useState } from "react";

const Home = () => {
	const [tarea, setTarea] = useState([]);
	const [tareaInput, setTareaInput] = useState("");
	const [userInput, setuserInput] = useState("");
	const [user, setUser] = useState(false);

	const addTask = (e) => {
		e.preventDefault();
		if (tareaInput !== ""){
			setTarea([...tarea, tareaInput]);
			setTareaInput("");
		}
	}

	// const deleteTask = (index) => {
	// 	const newTask = [...tarea];
	// 	newTask.splice(index, 1);
	// 	setTarea(newTask);		
	// }

	const addUser = (e) => {
		e.preventDefault();
		if (userInput !== ""){
			fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
		method: "POST",
		body: JSON.stringify({tarea}),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
		  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
		//   console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
		  return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => {
		  //manejo de errores
		  console.log(error);
	  });			
		}
		setuserInput("");
	}

	
	// fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
	// 	method: "POST",
	// 	body: JSON.stringify({tarea}),
	// 	headers: {
	// 	  "Content-Type": "application/json"
	// 	}
	//   })
	//   .then(resp => {
	// 	  console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
	// 	  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
	// 	//   console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
	// 	  return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	//   })
	//   .then(data => {
	// 	  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
	// 	  console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	//   })
	//   .catch(error => {
	// 	  //manejo de errores
	// 	  console.log(error);
	//   });

	
	fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
    method: "GET",
    //   body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
		console.log(resp.ok);
		setUser(true);		       
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.		
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)        
        return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results		
    })	
    .then(data => {		      
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor		
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });		
    	
	

	fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
      method: "PUT",
      body: JSON.stringify({tarea}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
		console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });

	const deleteAll = () => {fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
      method: "DELETE",
      body: JSON.stringify([tarea]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
    }
		
	return(

		{ user == true ?  <div className = "pared">
		<h1>todos</h1>
		<form className = "tareas">
		<div className = "input">
			<input type="text" autoComplete="off" value={tareaInput} placeholder = "Add user" onChange={e => setTareaInput(e.target.value)}/>
		</div>	
		<button type="submit" className="deleteall" onClick={addUser}>Submit</button>
		</form>
	</div> : <div className = "pared">
		<h1>todos</h1>
		<form className = "tareas" onClick={addTask}>
		<div className = "input">
			<input type="text" autoComplete="off" value={tareaInput} placeholder = "Que tengo que hacer?" onChange={e => setTareaInput(e.target.value)}/>
		</div>	
		<button type="submit" className="addButton"></button>		
		{tarea.map((item,index) => (			
			<div className="task" key={index}>
				<div className="newItem" key={index}>{item}</div>
				<button className="delete" onClick={deleteTask}>x</button>
           </div>
		))}
			<p>Pendientes: {tarea.length}</p>
			<button className="deleteall" onClick={deleteAll}>Borrar Todo</button>
		</form>
	</div>);}	
}


export default Home;

