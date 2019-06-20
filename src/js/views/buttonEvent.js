import {elements} from './base';

//TEMPORARY FUNCTION TO CORRECT TO COMPLICATED
export const moveDashControll = () =>{
    //GET TRANSLATEX VALUE 
    const st = window.getComputedStyle(elements.select, null);
    const tr = st.getPropertyValue("transform")
    let values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    values = values[4]

    //CHECK IF ELEMENTS IS HIDE
    if (values > 0){
        elements.select.style.transform = `translateX(0)`;
    }
    else{
        elements.select.style.transform = `translateX(100%)`;
    }

};