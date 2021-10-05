import React from 'react';
import { List, Typography, Divider } from 'antd';

import { Form, Input, Button, Checkbox } from 'antd';
const { TextArea } = Input;
const data = [
  'Phone: (+84)23 4324 1241',
  'Email: contact@aicgroup.com',
  'Website: aicgroup.com',
];


function AppContact() {
  return (
    <div >
      <Divider id="contact" orientation="center">Contact</Divider>
      <List
       style={{textAlign:"center"}}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark /> {item}
          </List.Item>
        )}
      />
    </div>
  );
}

export default AppContact;