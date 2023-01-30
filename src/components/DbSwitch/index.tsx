import React, { useState } from 'react';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import type { DbSwitchProps } from './dbSwitch';
// import { isPromise } from '@/utils/index';
const DbSwitch: React.FC<SwitchProps & DbSwitchProps> = ({ params = {}, request, defaultChecked = false, ...switchProps }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const requestHandler = async (status: boolean) => {
    let result: any = null;

    if (request) {
      setLoading(true);
      result = await request(status, params);
      setLoading(false);
    }
    return result;
  };

  const onSwitchClick = async (checke: boolean) => {

    if (request) {
      const result = await requestHandler(checke);
      setChecked(() => {
        /* if (!result) {
          return !pre;
        } */
        return result;
      });
    } else {
      setChecked((pre) => !pre);
    }
  };

  return <Switch className="dbswitch" loading={loading} checked={checked} onClick={onSwitchClick} {...switchProps} />;
};

export default DbSwitch;
