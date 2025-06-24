export default function Header() {
  return (<>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-(--primary)">SmartAid</h1>
        
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="" type="button">
           <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--primary)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier"> 
            <path d="M4 18L20 18" stroke="#082A57" strokeWidth="2" strokeLinecap="round"/> 
            <path d="M4 12L20 12" stroke="#082A57" strokeWidth="2" strokeLinecap="round"/> 
            <path d="M4 6L20 6" stroke="#082A57" strokeWidth="2" strokeLinecap="round"/> 
            </g>
           </svg>
        </button>
     
      </div>
   
     
     </>);
}