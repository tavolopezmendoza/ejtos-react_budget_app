import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency  } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    
    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
        if (budget >= 20001) {
            alert("The budget cannot exceed " + currency +" 20000");
            setNewBudget(20000);
            dispatch({
                type: 'SET_BUDGET',
                payload: 20000,
            });
            //return;
        } else if (budget < totalExpenses) {
            alert('You cannot reduce you budget value below than you spending');
            setNewBudget(totalExpenses);
            dispatch({
                type: 'SET_BUDGET',
                payload: totalExpenses,
            });
        } else {
            setNewBudget(event.target.value);
            dispatch({
                type: 'SET_BUDGET',
                payload: event.target.value,
            });
        }
    }
    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency} </span>
                <input
                    required="required"
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}>
            </input>
                       
        </div>
    );
};
export default Budget;
