import React from "react";
import {Tabs} from 'antd';
import Patients from "./Patients";
import Inquries from "./Inquries";
import Reports from "./Reports";

import { useSelector } from "react-redux";
const TabPane = Tabs.TabPane;



function Profile() {
  
  return (
    <div>
     <Tabs defaultActiveKey="1">
   
      <TabPane tab="Patients" key="1" >
        <Patients/>
      </TabPane>
      

    
      <TabPane tab="Inquries" key="2">
        <Inquries/>
      </TabPane>
     

      
      <TabPane tab="Reports" key="3">
        <Reports/>
      </TabPane>

      
     </Tabs>
    
    </div>
  );
}

export default Profile;