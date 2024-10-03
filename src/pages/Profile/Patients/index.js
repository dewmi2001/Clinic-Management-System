import React from "react";
import Button from "../../../components/Button";
import PatientForm from "./PatientForm";
import { DeletePatient, GetAllPatients } from "../../../apicalls/patients";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useEffect, useState } from "react";
import moment from "moment";
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';




function Patients() {
  const [formType, setFormType] = useState('add');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openPatientForm, setOpenPatientForm] = React.useState(false);
  const [searchQueary, setSearchQueary] = useState("");

  const [patients, setPatients] = React.useState([]);
  const dispatch = useDispatch();

  const getActivePatients = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllPatients();
      dispatch(HideLoading());
      if (response.success) {
        const activePatients = response.data.filter((patient) => !patient.isDeleted);
        setPatients(activePatients);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getActivePatients();
  }, []);

  const deletePatient = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeletePatient(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getActivePatients(); // Refresh the list of active patients
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  useEffect(() => {
    console.log("Selected Patient Data (selectedPatient):", selectedPatient);
  }, [selectedPatient]);


  const columns = [
    {
      title: "Patient Type",
      dataIndex: "ptype",
    },

    {

      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "fname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {

      title: "Age",
      dataIndex: "age",
    },

    {

      title: "Phone Number",
      dataIndex: "phone",
    },


    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">

          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedPatient(record);
              setOpenPatientForm(true);
            }}
          ></i>


          <i class="ri-delete-bin-fill"
            onClick={() => deletePatient(record._id)}
          ></i>
        </div>
      ),
    },
  ];



  const filteredPatients = patients.filter((patients) =>
    patients.id.includes(searchQueary)
  );


  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Add Patient"
          onClick={() => {
            setFormType("add");
            setSelectedPatient(null);
            setOpenPatientForm(true);
          }}
        />
      </div>

      <div className="flex pt-3 pb-3">


        <Input size="large" placeholder="search by NIC"
          value={searchQueary}
          onChange={(e) => setSearchQueary(e.target.value)}
          prefix={<UserOutlined />}
          style={{ width: "200px", border: "1px solid" }} />

      </div>


      {/* <Table columns={columns} dataSource={patients} className=" mt-1 ant-table-thead ant-table-cell " />*/}
      <Table columns={columns} dataSource={filteredPatients} className=" mt-1 ant-table-thead ant-table-cell " />

      {openPatientForm && (
        <PatientForm
          open={openPatientForm}
          setOpen={setOpenPatientForm}
          reloadPatients={getActivePatients}
          formType={formType}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      )}





    </div>
  );
}

export default Patients;