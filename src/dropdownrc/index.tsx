import Dropdown from 'rc-dropdown';
// import Menu, { Item as MenuItem, Divider } from 'rcmenu';
import Menu from '../menu';

import 'rc-dropdown/assets/index.css';
import React from 'react';

const RDropdown: React.FC = () => {
  function onSelect({ key }) {
    console.log(`${key} selected`);
  }

  function onVisibleChange(visible) {
    console.log(visible);
  }

  const menu = (
    <Menu onSelect={onSelect}>
      dada
      {/* <MenuItem disabled>disabled</MenuItem>
      <MenuItem key="1">one</MenuItem>
      <MenuItem key="2">two</MenuItem> */}
    </Menu>
  );

  return (
    <div>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}
      >
        <button style={{ width: 100 }}>open</button>
      </Dropdown>
    </div>
  );
};

export default RDropdown;
