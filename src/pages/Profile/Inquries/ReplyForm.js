// import React, { useState, useEffect } from 'react';
// import { Modal } from 'antd';
// import { useDispatch } from 'react-redux';
// import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
// import { message } from 'antd';
// import { GetRepliesByInquiryId } from '../../../apicalls/replies';


// function ReplyForm({ open, selectedInquiryId ,setOpen}) {
//   const [replyData, setReplyData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (open && selectedInquiryId) {
//       const fetchReply = async () => {
//         try {
//           dispatch(ShowLoading());
//           const response = await GetRepliesByInquiryId(selectedInquiryId); // Fetch replies by inquiry's _id
//           dispatch(HideLoading());

//           if (response.success) {
//             setReplyData(response.data); // Store reply data in state
//           } else {
//             message.error(response.message);
//           }
//         } catch (error) {
//           dispatch(HideLoading());
//           message.error(error.message);
//         }
//       };

//       fetchReply();
//     }
//   }, [open, selectedInquiryId]);


//   return (
//     <Modal
//     open={open}
//       onCancel={() => setOpen(false)} // Use the prop directly
//       centered
//       width={800}
//       footer={null}
//     >
//       {replyData && (
//         <div>
//           <h1 className="text-primary text-2xl font-bold" style={{ textAlign: 'center' }}>
//             Inquiry Reply
//           </h1>
//           <hr />
//           <div style={{ height: '20px' }}></div>
//           <p>ID: {replyData.id}</p>
//           <p>Name of Department Head: {replyData.named}</p>
//           <p>Reply: {replyData.reply}</p>
//         </div>
//       )}
//     </Modal>
//   );
// }

// export default ReplyForm;

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { message } from 'antd';
import { GetRepliesByInquiryId } from '../../../apicalls/replies';

function ReplyForm({ open, selectedInquiryId, setOpen }) {
  const [replyData, setReplyData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && selectedInquiryId) {
      const fetchReply = async () => {
        try {
          dispatch(ShowLoading());
          const response = await GetRepliesByInquiryId(selectedInquiryId); // Fetch replies by inquiry's _id
          dispatch(HideLoading());

          if (response.success) {
            setReplyData(response.data); // Store reply data in state
          } else {
            message.error(response.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

      fetchReply();
    }
  }, [open, selectedInquiryId]);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)} // Use the prop directly
      centered
      width={800}
      footer={null}
    >
      {replyData && (
        <div className='bg-white p-2 rounded'>
          <h1 className="text-primary text-2xl font-bold" style={{ textAlign: 'center' }}>
            Inquiry Reply
          </h1>
          <hr />
          <div style={{ height: '20px' }}></div>
          {/* Map over replyData and display each reply */}
          {replyData.map((reply, index) => (
            <div key={index}>
             {/* <h1>ID: {reply.id}</h1>*/}
              <h1 style={{fontSize:"30px"}}>Name of Department Head:</h1>
               <h1 style={{fontSize:"20px"}}> {reply.named} </h1>
              <div style={{height:"10px"}}></div>
              <h1 style={{fontSize:"30px"}}>Reply:</h1>
              <h1 style={{fontSize:"20px"}}>{reply.reply} </h1>
              <div style={{height:"10px"}}></div>
              <hr /> {/* Add a horizontal line to separate each reply */}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ReplyForm;
