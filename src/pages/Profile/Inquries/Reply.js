import React from "react";
import { Modal, Form, Input, message } from 'antd';
import Button from "../../../components/Button";
import { AddReply } from "../../../apicalls/replies";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Reply({
    open,
    setOpen,
}) {
    const { TextArea } = Input;
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());

            // Ensure user is defined and has an _id property
            if (user && user._id) {
                values.createdBy = user._id;

                const response = await AddReply(values);

                if (response.success) {
                    message.success(response.message);
                } else {
                    message.error(response.message);
                }
                dispatch(HideLoading());
            } else {
                // Handle the case where the user is undefined or does not have an _id property
                message.error("User information is missing.");
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <Modal
            visible={open}
            onCancel={() => setOpen(false)}
            centered
            width={800}
            footer={null}
        >
            <div className='bg-white p-2 rounded' style={{ height: "400px" }}>
                <Form layout="vertical" onFinish={onFinish} >
                    <h1 className='text-primary text-2xl font-bold ' style={{ textAlign: "center" }}>Inquiry Reply Form</h1>
                    <hr />
                    <div style={{ height: "20px" }}></div>

                   <Form.Item label="Inquiry Id" name="inquiryId" rules={[{ required: true, message: "Please input the inquiry id" }]}>
                        <Input type="text" placeholder='Id' />
                     </Form.Item>

                    <Form.Item label="Name of Department Head" name="named" rules={[{ required: true, message: "Please input the name" }]}>
                        <Input type="text" placeholder='Name' />
                    </Form.Item>

                    <div style={{ width: "500px" }}>
                        <Form.Item name="reply" label="Reply" rules={[{ required: true, message: "Please input reply for the inquiry" }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                    </div>

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
            </div>
        </Modal>
    );
}

export default Reply;




