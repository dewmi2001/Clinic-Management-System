import React from "react";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import InquiryForm from "./InquiryForm";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { Form } from "antd";
import { message, Table } from "antd";
import moment from "moment";
import { DeleteInquiry, GetAllInquiries } from "../../../apicalls/inquiries";
import { GetRepliesByInquiryId } from "../../../apicalls/replies";

function Inquries() {
  const [formType, setFormType] = useState("add");
  const [openInquiryForm, setOpenInquiryForm] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [openReplyForm, setOpenReplyForm] = React.useState(false);
  const [inquiries, setInquiries] = React.useState([]);
  const [selectedInquiry , setSelectedInquiry] = useState(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [replies, setReplies] = useState([]); // Initialize an empty array as the initial state

  const dispatch = useDispatch();
  



  const fetchRepliesByInquiryId = async (inquiryId) => {
    try {
      const response = await GetRepliesByInquiryId(inquiryId);
      if (response.success) {
        // Update the 'replies' state variable with the fetched replies
        setReplies(response.data);
      } else {
        message.error("Failed to fetch replies.");
      }
    } catch (error) {
      message.error("Network error occurred.");
    }
  };













  const getInquiries = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllInquiries();
      dispatch(HideLoading());
      if (response.success) {
        setInquiries(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  const deleteInquiry = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteInquiry(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getInquiries();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Selected Patient Data (selectedPatient):", selectedInquiry);
  }, [selectedInquiry]);

 


  const columns = [
   

    {
      title:"Inquary ID",
      dataIndex:"_id",
      width:150,
    },



    {
      title: "Person Name",
      dataIndex: "ifname",
      width: 100,

    },
    {
      title: "E-Mail",
      dataIndex: "iemail",
      width: 150,
    },
    {
      title: "Department",
      dataIndex: "dept",
      width: 150,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      width: 100,
      render: (text) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      width: 200, 
    render: (text) => (
      <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
        {text}
      </div>
    ),
    },
    {
      title: "Reply",
  
      render: (_, record) => {
        return <>
          <button type="button"
          style={{backgroundColor:"#F8BBD0"}}
            onClick={() => {
              setOpenReply(true);
            }}
            
          >REPLY</button>
        </>
      }

    },
  
    // Inside the columns definition for your table
{
  title: "See Reply",
  render: (_, record) => (
    <button
      type="button"
      style={{backgroundColor:"#F8BBD0"}}
      onClick={() => {
        // Call the function to fetch replies when the button is clicked
        fetchRepliesByInquiryId(record._id); // Pass the inquiry ID
        setSelectedInquiryId(record._id); // Set the selected inquiry ID in your state
        setOpenReplyForm(true); // Open the reply form or modal
      }}
    >
      SEE REPLY
    </button>
  ),
},

    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (text) => (
        <span className={`lebel ${text === "Pending" ? "lebel-pending" : "lebel-complete"}`}>
          {text}
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
    
      render: (text, record) => (
        <div className="flex gap-1">

          <i  className="ri-pencil-line" style={{ fontSize: "15px" }}
           onClick={() => {
            setFormType("edit");
            setSelectedInquiry(record);
            setOpenInquiryForm(true);

            console.log(selectedInquiry);
          }}
          
          
          >EDIT</i>


          <i class="ri-delete-bin-fill" style={{ fontSize: "15px" }}
          onClick={() => deleteInquiry(record._id)}
          >DELETE</i>
        </div>
      ),
    },


  ];




  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Add Inquiry"
          onClick={() => {
            setFormType("add");
            setOpenInquiryForm(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={inquiries} className="mt-1"
      scroll={{ y: 'calc(400vh - 0px)' }}  />

      {openInquiryForm && (
        <InquiryForm
          open={openInquiryForm}
          setOpen={setOpenInquiryForm}
          reloadInquiries={getInquiries}
          formType={formType}
          selectedInquiry={selectedInquiry}
          setSelectedInquiry={setSelectedInquiry}
        />
      )}

      {openReply && (
        <Reply
          open={openReply}
          setOpen={setOpenReply}

        />
      )}
     
     {openReplyForm && (
  <ReplyForm
    open={openReplyForm}
    setOpen={setOpenReplyForm}
    selectedInquiryId={selectedInquiryId} // Pass the selected inquiry's ID
  />
)}




<div>
    {/* Display or work with 'replies' here */}
    {replies.map((reply) => (
      <div key={reply._id}>{reply.text}</div>
    ))}
  </div>

    </div>
  );
}

export default Inquries;