import React from 'react'

const DropdownMenu = () => {
  return (
    <div className='flex flex-col dropDownMenu'>
      <ul className='flex flex-col gap-4'>
        <li>Profiles</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default DropdownMenu