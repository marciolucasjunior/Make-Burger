import { useState,useEffect } from 'react'

import './Pedidos.css'

function Pedidos() {
    
    const [usuarios,setusuarios] = useState([])
    
    //Pegando dados, requisição http
    useEffect(()=>{
     fetch('api-burger-cfqyt7k3i-marciolucasjunior.vercel.app',{
      method:'GET',
     }).then((resp)=> resp.json()).then((data)=>{
      setusuarios(data)
     })

    },[])

    
   let deletar = (id) => {
      
      let confirmar = confirm('Tem certeza que deseja cancelar o pedido?')
      if(confirmar) { 
      console.log(id)
      fetch('http://localhost:3001/deletar/'+id,{
      method: 'POST',
      headers: {
         'Content-Type':'application/json'
      },
  }).then(()=>{
    location.reload()
  })}
  
}


 if(usuarios.length  > 0 ) {
    
    console.log(usuarios)
 }

   
 return(
        <div>
             <h1 id='titulo'>Gerenciar pedidos:</h1>


 {usuarios.length > 0 ?
    <table>
    <thead>
       <tr>
           <td>#</td>
           <td>Cliente</td>
           <td>pão</td>
           <td>Carne</td>
           <td>Opcionais</td>
           <td>Ações</td>
       </tr>
    </thead>
    {usuarios.map(usuarios => (
    <tbody key={usuarios.id.toString()}>
         <tr>
          <td>{usuarios.id}</td>
          <td>{usuarios.cliente}</td>
          <td>{usuarios.pao}</td>
          <td>{usuarios.carne}</td>
         <td>
            <ul>
              <li> {usuarios.bacon}</li>
              <li> {usuarios.salame}</li>
              <li> {usuarios.cebola}</li>
              <li> {usuarios.chedar}</li>
              <li> {usuarios.pepino}</li>
              <li>{usuarios.tomate}</li>
            </ul>
          
          </td>
          
          
          <td id='btn'>
          <select name="" id="finalizado">
                <option value="Solicitado">Solicitado</option>
                <option value="Em_producao">Em produção</option>
                <option value="Finalizado">Finalizado</option>
            </select>
           <button onClick={()=> deletar(usuarios.id)}>cancelar</button>
          </td>
         </tr>
       </tbody>
     ))}  

       </table>
   
  

:<h2>Aguardando Pedidos...</h2>}

 


</div>
    )
    }

export default Pedidos