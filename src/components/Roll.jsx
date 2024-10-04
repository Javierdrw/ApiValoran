const Roll = ({ api, handelRoll }) => {
    const roles = new Set();
    
    api.forEach(roll => {
      roles.add(roll.role?.displayName || 'No hubo respuesta');
    });
  
    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      handelRoll(value, checked);
    };
  
    return (
      <div className="flex gap-2 bg-slate-500 rounded-md py-2 px-3">
        <h3 className="font-bold text-xl">Roles</h3>
        {Array.from(roles).map((roll, index) => (
          <label key={index} className="cursor-pointer " >
            <input 
              type="checkbox" 
              value={roll} 
              onChange={handleCheckboxChange} 
            />
            {roll}
          </label>
        ))}
      </div>
    );
  };
  
  export default Roll;
  