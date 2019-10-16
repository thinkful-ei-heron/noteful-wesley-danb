import React from 'react';

export default function apiFetch(route,dynamic) {
   
  return (

    fetch(`http://localhost:9090/`)
      .then(res => {
        if (!res.ok){
          console.log(res.error);
          return res.error;
        } 
        return res.json();
      })
  )
  }

