import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';

// MedicationCard Component
export default function MedicationCard({medication,time}) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleMedication = () => {
    setIsSelected((prev) => !prev);
  };

  return (<>
  
     <div className="flex  justify-between">
        <div className="flex items-center gap-6">
            <button
            onClick={toggleMedication}
            className={`w-5 h-5 border-2 border-(--secondary) rounded-md transition-all duration-200 ${
              isSelected ? 'bg-(--secondary)' : 'bg-white'
            }`}
          ></button>
          <p>{medication}</p>
        </div>
        <p>{time}</p>
      </div>


  </>)
    
};

MedicationCard.propTypes = {
    medication: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
};