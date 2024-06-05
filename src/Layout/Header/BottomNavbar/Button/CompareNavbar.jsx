import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
function CompareNavbar(){
    return(
        <div>
<nav class="page-menu-nav mx-auto">
        <ul class="page-menu-container m-2 p-2  m-lg-0 p-lg-2">
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-compareboth active">Compare</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-reversal active">Reversal</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-3d btn-sm toggle-columns-vega" data-column="vega">Vega</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-theta" data-column="theta">Theta</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-gamma" data-column="gamma">Gamma</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-delta" data-column="delta">Delta</li>
            <li class="page-menu-item btn toggle-columns btn-light btn-sm toggle-columns-ivtv" data-column="ivtv">I.V./T.V.</li>
        </ul> 
    </nav>
    </div>
    )
}
export default CompareNavbar