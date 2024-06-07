import 'bootstrap/dist/css/bootstrap.min.css';
import { CompareContext } from '../../../../Context/CompareButton';
import { useContext , useEffect} from 'react';
import * as React from 'react';
import { useState } from 'react';
function CompareNavbar(){

       const compareValue = useContext(CompareContext)
       const [selectedItem, setSelectedItem] = useState('');

       const handleClick = (value) => {
        setSelectedItem(value);
      };
    

    useEffect(()=>{
        compareValue.setCompareValue(selectedItem)
    },[selectedItem])


    return(
        <div className >
        <nav class="page-menu-nav mx-auto">
        <ul class="page-menu-container m-2 p-2 m-lg-0 p-lg-2 flex">
          <li class="page-menu-item">
            <button
              class="btn toggle-columns btn-light btn-sm toggle-columns-compareboth active"
              onClick={() => handleClick('Compare')}
            >
              Compare
            </button>
          </li>
          <li class="page-menu-item">
            <button
              class="btn toggle-columns btn-light btn-sm toggle-columns-reversal active"
              onClick={() => handleClick('Reversal')}
            >
              Reversal
            </button>
          </li>
          <li class="page-menu-item">
            <button
              class="btn toggle-columns btn-light btn-3d btn-sm toggle-columns-vega"
              onClick={() => handleClick('Vega')}
              data-column="vega"
            >
              Vega
            </button>
          </li>
          <li className="page-menu-item">
            <button
              className="btn toggle-columns btn-light btn-sm toggle-columns-theta"
              onClick={() => handleClick('Theta')}
              data-column="theta"
            >
              Theta
            </button>
          </li>
          <li className="page-menu-item">
            <button
              className="btn toggle-columns btn-light btn-sm toggle-columns-gamma"
              onClick={() => handleClick('Gamma')}
              data-column="gamma"
            >
              Gamma
            </button>
          </li>
          <li className="page-menu-item">
            <button
              className="btn toggle-columns btn-light btn-sm toggle-columns-delta"
              onClick={() => handleClick('Delta')}
              data-column="delta"
            >
              Delta
            </button>
          </li>
          <li className="page-menu-item">
            <button
              className="btn toggle-columns btn-light btn-sm toggle-columns-ivtv"
              onClick={() => handleClick('IvTv')}
              data-column="ivtv"
            >
              I.V./T.V.
            </button>
          </li>
        </ul>
     
      </nav>
      </div>
    )
}
export default CompareNavbar