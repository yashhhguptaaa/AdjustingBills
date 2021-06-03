import React , { useContext , useState} from 'react';
import { BillContext } from '../../Context/BillContext';
import './style.css';

const BillTotal = () => {

    const {bills, selectedCostInterval} = useContext(BillContext)

    const moneyIntervalTransform = (cost) => {
        const monthlyCost = Number.parseFloat(cost);
        switch (selectedCostInterval) {
            case 'Monthly':
                return monthlyCost;

            case 'Yearly':
                return monthlyCost * 12;
                
            case 'Weekly':
                return monthlyCost * 12/52;
                
            case 'Daily':
                return monthlyCost * 12/365;    
                
                
        
            default:
                return 0;
        }
    }
    return (
      <>
      <div className="bill-total-container">
          {selectedCostInterval} Bill Cost : 
          <span className="total-cost">
              { 
                'Rs.' + bills.reduce((acc,val) => {
                    return val.enabled? 
                    moneyIntervalTransform(val.monthlyCost) + acc : 
                    acc
                },0).toFixed(2)
              }
          </span>
      </div>

      <div className="total-saved-container">
          You saved :
          <span className="total-saved">
              {
                  'Rs.' + bills.reduce((acc,val) =>{
                      return !val.enabled ?
                      moneyIntervalTransform(val.monthlyCost) + acc :
                      acc
                  },0).toFixed(2)
              }
          </span>
      </div>
      </>
    );

}
export default BillTotal;