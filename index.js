/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

function validateForm(form) {
    const inputKey = document.querySelector('#key');  
    const inputTitle = document.querySelector('#title');  
    const results = document.querySelector('.results pre');  
    const poster = document.querySelector('.results img');  
    results.textContent = '';
    poster.removeAttribute('src'); 
    let invalid = false;

    if(form.key.value == ''){
        inputKey.style.border = '2px solid red';        
        invalid = true;
    }else{
        inputKey.style.border = '';  
    }

    if(form.title.value == ''){
        inputTitle.style.border = '2px solid red';        
        invalid = true;
    }else{
        inputTitle.style.border = '';   
    }

    if(!invalid){                 
        const url = `https://www.omdbapi.com/?apikey=${form.key.value}&t=${form.title.value}&${form.year.value == '' ? '' : 'y=' + form.year.value + '&'}plot=${form.plot.value}`;
        
         
        // read from json
        fetch(url)
            .then((res) => {                
                return res.json();                         
            })
            .then((out) => {                 
                if(out.Response == 'True'){
                    results.textContent = 
                    `            
Title: ${out.Title}
Year: ${out.Year}
Rating: ${out.Rated}
Release Date: ${out.Released}                
                    `;   

                    if(out.Poster != 'N/A') {
                        poster.setAttribute('src', out.Poster);
                    }else{
                        poster.removeAttribute('src');
                    }

                }else{
                    if(out.Error == 'Invalid API key!'){
                        results.textContent = 'I\'m sorry, Invalid API Key';
                    }else{
                        results.textContent = 'I\'m sorry, what you searched for could not be found!';                        
                    }

                    poster.removeAttribute('src');                    
                }     
                console.log(out);
            }).catch((err)=> console.error(err));

    }

    return false;
}

