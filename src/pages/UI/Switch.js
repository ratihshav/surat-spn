import React from 'react';

const SwitchComponent = ({ onChange, value, defaultChecked, checked, name, ref }) => {
  return (
    < >
      <input
        name={name}
        className="custom-switch"
        type="checkbox"
        value={value}
        defaultChecked={defaultChecked}
        checked={checked}
        id={value}
        ref={ref}
        onChange={onChange} />
      <label className="custom-switch-label" htmlFor={value}>Toggle</label>
    </>
  );
};

export default SwitchComponent;