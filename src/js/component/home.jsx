import React, { useState, useEffect } from "react";

const Home = () => {
	const [tarea, setTarea] = useState([]);
  console.log("newtarea:", tarea)
	const [tareaInput, setTareaInput] = useState({label:"",done:false});
  const [userActive, setUserActive] = useState(false);
  
	
	const addTask = (e) => {
		e.preventDefault();
		if (tareaInput.label !== ""){
      newTodo();      
			setTarea([...tarea, tareaInput]);
			setTareaInput({label:"",done:false});
		}
	}  

	const deleteTask = (index) => {
		const newTask = [...tarea];
		newTask.splice(index, 1);
		setTarea(newTask);		
    console.log("delete:", tarea)
	}

  useEffect(() => {
    user();
    if(!userActive) {
      newUser();           
    }
    else{
      getTodo();
    }
    }, [!userActive]);

     	const newUser = () => {
    fetch( "https://assets.breatheco.de/apis/fake/todos/user/joeyb83", {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log("Response newUser ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
		  console.log("Response newUser status", resp.status); // el código de estado = 200 o código = 400 etc.
		//   console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
		  return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log("newUser data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      // if (data.result == "ok"){
      //   setUserActive(true);
      // }        
	  })
	  .catch(error => {
		  //manejo de errores
		  console.log("Error newUser", error);
	  });       
  }  
	
	const user = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user', {
    method: "GET",    
    })
    .then(resp => {
		console.log("Response User ok", resp.ok);
		console.log("Response User status", resp.status); // el código de estado = 200 o código = 400 etc.		
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)        
    return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results		
    })	
    .then(data => {		      
        console.log("user data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        setUserActive(data.includes("joeyb83"));
        console.log("setUserActive status", data.includes("joeyb83") );               		
    })
    .catch(error => {
        //manejo de errores
        console.log("Error user", error);
    });
  }

  const getTodo = () => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
      method: "GET",      
    })
    .then(resp => {
		console.log("Response getTodo ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log("Response getTodo status", resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es dondes debe comenzar tu código después de que finalice la búsqueda
        console.log("getTodo data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        // console.log("Ese arreglo ", Array.isArray(data)); //esto imprimirá en la consola el objeto exacto recibido del servidor
        setTarea(data);        
    }, [])
    .catch(error => {
        //manejo de errores
        console.log("Error getTodo", error);
    });
  }  
  
  	const newTodo = () => {      
      fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
      method: "PUT",
      body: JSON.stringify(tarea),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
		console.log("Response newTodo ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log("Response newTodo status", resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {        
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log("newTodo data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor        
        console.log("Tareas:", tarea);
        // setTarea(data);               
    })
    .catch(error => {
        //manejo de errores
        console.log("Error newTodo", error);
    });
  }

	const deleteAll = () => {fetch('https://assets.breatheco.de/apis/fake/todos/user/joeyb83', {
      method: "DELETE",
      body: JSON.stringify([tarea]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log("Response deleteAll ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log("Response deleteAll status", resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log("deleteAll data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        if (data.result == "ok"){
          setTarea([]);
          setUserActive(false);
        }      
    })
    .catch(error => {
        //manejo de errores
        console.log("Error deleteAll", error);
    });
    }
		
	return(
		<div className = "pared">
		<h1>todos</h1>
		<form className = "tareas" onClick={addTask}>
		<div className = "input">
			<input type="text" autoComplete="off" value={tareaInput.label} placeholder = "Que tengo que hacer?" onChange={e => setTareaInput({label: e.target.value, done: false})}/>
		</div>	
		<button type="submit" className="addButton"></button>		
		{tarea.map((tarea,index) => (
      <div className="task" key={index}>
        <div className="newItem" key={index}>{tarea.label}</div>
        <button className="delete" onClick={() => deleteTask(index)}>x</button>
      </div>
		))}
			<p>Pendientes: {tarea.length}</p>
			<button className="deleteall" onClick={deleteAll}>Borrar Todo</button>
		</form>
	</div>);	
}


export default Home;

