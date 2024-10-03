import { Modal, Row } from "antd";
import React from "react";
import { Form, Input, Select, Radio } from 'antd';
import Button from "../../../components/Button";
import { Col, message } from "antd";
import { AddInquiry ,UpdateInquiry } from "../../../apicalls/inquiries";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";




function InquiryForm({
   open,
   setOpen,
   reloadInquiries,
   setFormType,
   formType,
   selectedInquiry,
   setSelectedInquiry,
}) {
   const { Option } = Select;
   const { TextArea } = Input;
   const { user } = useSelector((state) => state.users);
   const dispatch = useDispatch();

   const onFinish = async (values) => {
      try {
         dispatch(ShowLoading());
 
         values.createdBy = user._id;
         let response = null;
         if (formType === "add") {
            response = await AddInquiry(values);
         } else {
            values._id = selectedInquiry._id;
            response = await UpdateInquiry(values);
         }
         if (response.success) {
            message.success(response.message);
            reloadInquiries();
            setOpen(false);
         } else {
            message.error(response.message);
            console.log("Selected Patient Data (selectedPatient):", selectedInquiry);

         }
         dispatch(HideLoading());
      } catch (error) {
         dispatch(HideLoading());
         message.error(error.message);
         console.log("Selected Patient Data (selectedPatient):", selectedInquiry);

      }
   };

   return (
      <Modal
      title={formType === "add" ? "Add Inquiry" : "Update Inquiry"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}

      >

         <div className='bg-white p-2 rounded' style={{ height: "700px" }}>
            <Form layout="vertical"
               onFinish={onFinish}
               initialValues={selectedInquiry}
            >
               <h1 className='text-primary text-2xl font-bold ' style={{ textAlign: "center" }}>Inquiry Request Form</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>

               <Form.Item label="Name of the Person" name="ifname" rules={[{ required: true, message: ' First name is required' }]} >
                  <Input type="text" placeholder='First Name' />
               </Form.Item>

               <Form.Item name="ilname" rules={[{ required: true, message: ' Last name is required' }]}>
                  <Input type="text" placeholder='Last Name' />
               </Form.Item>
               <div className='flex gap-3'>
                  <div style={{ width: "500px" }}>
                     <Form.Item label="E-mail" name="iemail" rules={[{ required: true, message: 'E-Mail is required' }]}>
                        <Input type="email" placeholder='E-Mail' />
                     </Form.Item>
                  </div>
                  <div style={{ width: "500px" }}>
                     <Form.Item
                        name="dept"
                        label="Department"
                        rules={[{ required: true, message: 'Please select the Department!' }]}
                     >
                        <Select placeholder="select department">
                           <Option value="Payment">Payment</Option>
                           <Option value="Pharmacy">Pharmacy</Option>
                           <Option value="Registration">Registration </Option>
                           <Option value="Appointment">Appointment </Option>
                           <Option value="Laboratory">Laboratory </Option>
                           <Option value="Inventory">Inventory </Option>
                           <Option value="Doctor Prescription">Doctor Prescription </Option>
                        </Select>
                     </Form.Item>
                  </div>
               </div>





               <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Subject is required' }]} >
                  <Input type="text" placeholder='Subject' />
               </Form.Item>


               <div style={{ width: "500px" }}>
                  <Form.Item name="message" label="Message">
                     <TextArea rows={4} />
                  </Form.Item>
               </div>

               <Form.Item
                        name="status"
                        label="Status"
                     >
                        <Select placeholder="select satus">
                        <Option value="Pending">Pending</Option>
                           <Option value="Completed">Completed</Option>
                        </Select>
                     </Form.Item>


               <div className="flex justify-end gap-2 mt-1">
                  <Button
                     type="button"
                     variant="outlined"
                     title="Cancel"
                     onClick={() => setOpen(false)}
                  />
                  <Button title="Save" type="submit" />
               </div>

            </Form>

         </div >

      </Modal >

   );
}

export default InquiryForm;