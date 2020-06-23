import React from 'react';

const SwitchComponent = ({ onChange, value, defaultChecked }) => {
  return (
    < >
        <input
          className="custom-switch"
          type="checkbox"
          value={value}
          defaultChecked={defaultChecked}
          id={value}
          onChange={onChange} />
        <label className="custom-switch-label" htmlFor={value}>Toggle</label>
    </>
  );
};

export default SwitchComponent;