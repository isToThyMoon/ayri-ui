import classnames from 'classnames';
import React from 'react';
// import './style/index.less'

interface IiconProps {
  type: string;
  size?: 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48 | 64;
}

const Icon: React.FC<IiconProps> = (props) => {
  return (
    <i
      className={classnames('ft-icon', props.type, {
        ['icon__size--' + props.size]: props.size,
      })}
    />
  );
};

export default Icon;
