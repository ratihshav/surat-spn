import React from 'react';

const SwitchComponent = ({ onChange, value, defaultChecked }) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          value={value}
          defaultChecked={defaultChecked}
          onChange={onChange} />
        <div className="slider"></div>
      </label>
    </>
  );
};

export default SwitchComponent;