// RoleRadioGroup.js
import React from 'react';
import { Switch, Radio } from 'antd';

const RoleRadioGroup = ({ toggleSwitch, onToggleSwitchChange, radioValue, onChangeRadio }) => (
    <div className="l-row d-flex flex-column justify-content-center align-items-start gap-4  mt-lg-1">
        <div class="form-check form-switch">
            <Switch
                onChange={onToggleSwitchChange}
            />
            <label class="form-check-label ps-2" for="flexSwitchCheckChecked">Select Your Role (optional)</label>
        </div>
        <div className="radios d-flex gap-5">
            <Radio.Group
                buttonStyle='solid'
                size="large"
                onChange={onChangeRadio}
                disabled={!toggleSwitch}
                value={radioValue}>
                <Radio value={1}>Student</Radio>
                <Radio value={2}>Teacher</Radio>
                <Radio value={3}>Other</Radio>
            </Radio.Group>
        </div>
    </div>
);

export default RoleRadioGroup;
