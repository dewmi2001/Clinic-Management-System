import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetReports } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Reports() {
    const [totalPatients, setTotalPatients] = useState(0);
    const [recentlyDeletedPatients, setRecentlyDeletedPatients] = useState(0);

    const dispatch = useDispatch();
    
    const getReports = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetReports();
            dispatch(HideLoading());
            if (response.success) {
                setTotalPatients(response.data.patients.patientsCount);
                setRecentlyDeletedPatients(response.data.patients.recentlyDeletedCount);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getReports();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="shadow p-2 justify-center" style={{ width: "300px" }}>
                <h1 className="text-secondary text-xl font-bold uppercase">
                    Patients Report
                </h1>
                <hr />

                <div className="flex justify-between mt-1">
                    <h1 className="text-md">Total Patients</h1>
                    <h1>{totalPatients}</h1>
                </div>

                <div className="flex justify-between mt-1">
                    <h1 className="text-md">Recently Deleted Patients</h1>
                    <h1>{recentlyDeletedPatients}</h1>
                </div>
            </div>
        </div>
    );
}

export default Reports;
