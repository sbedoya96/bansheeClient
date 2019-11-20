import React, { Fragment } from 'react'


export const NoMatchPage = () => {
    return (
<Fragment>
        <h1>Uuuups....Error 404 </h1>
        <p class="zoom-area">
No se pudo encontrar la página que está intentando acceder, intente con otra página.</p>
        <section class="error-container">
          <span>4</span>
          <span><span class="screen-reader-text">0</span></span>
          <span>4</span>
        </section>
        
        </Fragment>
    );
  };
