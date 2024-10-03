import { Modal, Row } from "antd";
import React from "react";
import { Form, Input, Select, Radio } from 'antd';
import { DatePicker, Space } from 'antd';
import Button from "../../../components/Button";
import { Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { AddPatient, UpdatePatient, GetPatientById } from "../../../apicalls/patients";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";




function PatientForm({
   open,
   setOpen,
   reloadPatients,
   setFormType,
   formType,
   selectedPatient,
   setSelectedPatient,
}) {
   const { Option } = Select;
   const { TextArea } = Input;
   const { user } = useSelector((state) => state.users);
   const dispatch = useDispatch();

  //----------------------------------
   const [patientType, setPatientType] = useState("infant");


   const [form] = Form.useForm();
   const [age, setAge] = useState(null);


   const handleDateChange = (e) => {
      form.setFieldsValue({ age: calculateAge(e.target.value) });
   };
   
   const calculateAge = (dateString) => {
      if (!dateString) return '';
   
      const today = new Date();
      const birthDate = new Date(dateString);
      const ageInMilliseconds = today - birthDate;
      const years = Math.floor(ageInMilliseconds / 31536000000);
      const months = Math.floor((ageInMilliseconds % 31536000000) / 2628000000);
      const days = Math.floor(((ageInMilliseconds % 31536000000) % 2628000000) / 86400000);
   
      if (years > 0) {
         return `${years} years`;
      } else if (months > 0) {
         return `${months} months`;
      } else {
         return `${days} days`;
      }
   };
   





  //-------------------------------------------

   // Handle patient type change
   const handlePatientTypeChange = (value) => {
      setPatientType(value);
   };

   const validateIdCardNumber = (rule, value) => {
      // Validation for both "infant" and "teen/older" patients
      const idRegex = /^[0-9]{9}[Vv]$|^[0-9]{12}$/;
      if (!idRegex.test(value)) {
         return Promise.reject("Invalid ID card number");
      }
      return Promise.resolve();
   };





   const onFinish = async (values) => {
      try {
         dispatch(ShowLoading());

         // Calculate age before submitting
        // calculateAge(values.dob);

         // Validate ID card number before submitting
         if (!validateIdCardNumber(values.id)) {
            dispatch(HideLoading());
            return;
         }
         values.createdBy = user._id;
         let response = null;
         if (formType === "add") {
            response = await AddPatient(values);
         } else {
            values._id = selectedPatient._id;
            response = await UpdatePatient(values);
         }
         if (response.success) {
            message.success(response.message);
            reloadPatients();
            setOpen(false);
         } else {
            message.error(response.message);
            console.log("Selected Patient Data (selectedPatient):", selectedPatient);

         }
         dispatch(HideLoading());
      } catch (error) {
         dispatch(HideLoading());
         message.error(error.message);
         console.log("Selected Patient Data (selectedPatient):", selectedPatient);

      }
   };






   return (
      <Modal
         title={formType === "add" ? "Add Patient" : "Update Patient"}
         open={open}
         onCancel={() => setOpen(false)}
         centered
         width={800}
         footer={null}

      >

         <div className='bg-white p-2 rounded' style={{ height: "1700px" }}>
            <Form layout="vertical" onFinish={onFinish} style={{ fontSize: "50px" }} form={form} //-------
               initialValues={{
                  ...selectedPatient, dob: selectedPatient && selectedPatient.dob ? new Date(selectedPatient.dob).toISOString().split("T")[0] : null
               }}
            >
               <h1 className='text-primary text-2xl font-bold ' style={{ textAlign: "center" }}>Patient Registration Form</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>


                {/*---------------------------------------------------------------*/}
               <div>
                  {/* Patient Type Selection */}
                  <Form.Item
                     label="Patient Type"
                     name="ptype"
                     initialValue={patientType}
                  >
                     <Select onChange={handlePatientTypeChange}>
                        <Option value="infant">Infant</Option>
                        <Option value="children">Children(under 18)</Option>
                        <Option value="older">Older(above 18)</Option>
                     </Select>
                  </Form.Item>
               </div>

                {/*----------------------------------------------------------------------------*/}
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>

                     <Form.Item
                        label={patientType === "older" ?  "ID Card Number" : "Guardian ID Number" }
                        name="id"
                        rules={[
                           {
                              required: true,
                              message:
                                 patientType === "older"
                                    ? "Please input ID Card Number"
                                    : "Please input Guardian ID Number",
                           },
                           { validator: validateIdCardNumber },
                        ]}
                     >
                        <Input type="text" placeholder=" ID" />
                     </Form.Item>
                  </div>
               </div>
                {/*-----------------------------------------------------------------------*/}
               <div className="flex gap-3">
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[
                           { required: true, message: "Please input date of birth" },
                        ]}
                     >
                        <input type="date" onChange={handleDateChange} />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        label="Patient Age"
                        name="age"
                        rules={[{ required: true, message: 'Age is required' }]}
                     >
                        <Input type="text" placeholder="Age" value={calculateAge()} readOnly />
                     </Form.Item>
                  </div>
               </div>


               <Form.Item label="Name" name="fname" rules={[{ required: true, message: ' First name is required' }]} >
                  <Input type="text" placeholder='First Name' />
               </Form.Item>

               <Form.Item name="mname" rules={[{ required: true, message: ' Middle name is required' }]}>
                  <Input type="text" placeholder='Middle Name' />
               </Form.Item>

               <Form.Item name="lname" rules={[{ required: true, message: ' Last name is required' }]}>
                  <Input type="text" placeholder='Last Name' />
               </Form.Item>
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'E-Mail is required' }]}>
                        <Input type="email" placeholder='E-Mail' />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please select Gender!' }]}
                     >
                        <Select placeholder="select gender">
                           <Option value="male">Male</Option>
                           <Option value="female">Female</Option>
                           <Option value="other">Other</Option>
                        </Select>
                     </Form.Item>
                  </div>
               </div>
               <Form.Item label="Address" rules={[{ required: true, message: 'please select province' }]} name='provice'>
                  <Select placeholder="Select Provice">
                     <Option value="Anuradhapura"> (North Central Province)</Option>
                     <Option value="Badulla">(Uva Province)</Option>
                     <Option value="Jaffna">(Northern Province)</Option>
                     <Option value="Kandy">(Central Province)</Option>
                     <Option value="Kurunegala">(North Western Province)</Option>
                     <Option value="Ratnapura">(Sabaragamuwa Province)</Option>
                     <Option value="Trincomalee">(Eastern Province)</Option>
                     <Option value="Colombo">(Western Province)</Option>
                     <Option value="galle">(Southern)</Option>
                  </Select>
               </Form.Item>

               <Form.Item rules={[{ required: true, message: 'please enter district' }]} name='district'>
                  <Input type="text" placeholder="Input District" />
               </Form.Item>

               <Form.Item rules={[{ required: true, message: 'please select street address' }]} name='street'>
                  <Input type="text" placeholder='Street Address' />
               </Form.Item>
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item rules={[{ required: true, message: 'please select city' }]} name='city'>
                        <Input type="text" placeholder='City' />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item rules={[{ required: true, message: 'please enter postal code' }]} name='pcode'>
                        <Input type="text" placeholder='Postal Code' />
                     </Form.Item>
                  </div>
               </div>

               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        label='Phone Number'
                        name="phone"
                        rules={[
                           { required: true, message: 'Phone number is required' },
                           {
                              validator: (_, value) => {
                                 // Check if the value matches either format
                                 if (
                                    /^(0\d{9}|(\+\d{1,3})?\d{9})$/.test(value)
                                 ) {
                                    return Promise.resolve();
                                 } else {
                                    return Promise.reject(
                                       'Please enter a valid phone number starting with "0" or an international number with a country code.'
                                    );
                                 }
                              },
                           },
                        ]}
                     >
                        <Input
                           type="tel"
                           placeholder='0######### or (+##)#########'
                        />
                     </Form.Item>


                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        name="mstatus"
                        label="Marital Status"
                        rules={[{ required: true, message: 'Please select marital status!' }]}
                     >
                        <Select placeholder="select Status">
                           <Option value="single">Single</Option>
                           <Option value="married">Married</Option>
                        </Select>
                     </Form.Item>
                  </div>
               </div>


               <h1 className='text-lg  font-bold'>In Case Of Emergency</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>

               <Form.Item label="Name of the Person" name="refname" rules={[{ required: true, message: ' First name is required' }]} >
                  <Input type="text" placeholder='First Name' />
               </Form.Item>

               <Form.Item name="relname" rules={[{ required: true, message: ' Last name is required' }]}>
                  <Input name="lname" type="text" placeholder='Last Name' />
               </Form.Item>

               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item label='Relationship' name="relation" >
                        <Input type="text" placeholder='mother/father/friend...' />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>

                  <Form.Item
                        label='Phone Number'
                        name="rephone"
                        rules={[
                           { required: true, message: 'Phone number is required' },
                           {
                              validator: (_, value) => {
                                 // Check if the value matches either format
                                 if (
                                    /^(0\d{9}|(\+\d{1,3})?\d{9})$/.test(value)
                                 ) {
                                    return Promise.resolve();
                                 } else {
                                    return Promise.reject(
                                       'Please enter a valid phone number starting with "0" or an international number with a country code.'
                                    );
                                 }
                              },
                           },
                        ]}
                     >
                        <Input
                           type="tel"
                           placeholder='0######### or (+##)#########'
                        />
                     </Form.Item>
                  </div>
               </div>
               <h1 className='text-lg  font-bold'>Health History</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item name="takingmedicine" label="Taking Any Medications,Currently?" rules={[{ required: true, message: ' Answer is required' }]}>
                        <Radio.Group>
                           <Radio value="yes"> Yes </Radio>
                           <Radio value="no"> No </Radio>
                        </Radio.Group>
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item name="answer" label="If Yes, Please List It Here">
                        <TextArea rows={4} />
                     </Form.Item>
                  </div>
               </div>
               <div className='flex item-between gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item name="anyallergies" label="Do You Have Any Allergies?" rules={[{ required: true, message: ' Answer is required' }]}>
                        <Radio.Group>
                           <Radio value="yes"> Yes </Radio>
                           <Radio value="no"> No </Radio>
                        </Radio.Group>
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }} >
                     <Form.Item name="anwserall" label="If Yes, Please List It Here">
                        <TextArea rows={4} />
                     </Form.Item>
                  </div>
               </div>
               <hr></hr>
               <div style={{ height: "20px" }}></div>
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item label="Weight (Pounds)" name="weight" rules={[{ required: true, message: ' Weight is required' }]} >
                        <Input type="text" placeholder='###lb' />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item label="Height (Inches) of the Person" name="height" rules={[{ required: true, message: ' Height is required' }]} >
                        <Input type="text" placeholder='###in' />
                     </Form.Item>
                  </div>
               </div>

               <div className="flex justify-end gap-2 mt-1">
                  <Button
                     type="button"
                     variant="outlined"
                     title="Cancel"
                     onClick={() => setOpen(false)}
                  />
                  <Button title="Submit" type="submit" />
               </div>

            </Form>
         </div >

      </Modal >

   );
}

export default PatientForm;