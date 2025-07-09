import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full" style={{ height }}>
      <div
        className={`rounded-full ${bgcolor} h-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};


export default Progress_bar;