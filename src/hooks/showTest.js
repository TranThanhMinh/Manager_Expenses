import React from "react";

const showTest =()=>{

    const getText =({text})=>{
          if(text === '1'){
            console.log('getText: 1')
          }else 
          {
            console.log('getText: 2')
          }
    }

    return{
        getText
    }
}

export default showTest;