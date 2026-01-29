import React, { useState } from "react";
import {  Label, TextInput, Textarea } from "flowbite-react";
import { getemployeeId, getEmail, getName } from "../utils";
import { getAllLeaves, postLeave } from "../api";

export const ApplyLeaveForm = ({ onSubmit, onClose }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [applicationReason, setApplicationReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: getemployeeId(),
      name: getName(),
      email: getEmail(),
      fromDate,
      toDate,
      applicationReason,
      status: "Pending",
    };

    const obj = {
      employeeId: getemployeeId(),
      name: getName(),
      email: getEmail(),
      startDate: fromDate,
      endDate: toDate,
      applicationReason,
    };
    console.log("formData", formData);
    await onSubmit(formData);
    await postLeave(obj);
    await getAllLeaves();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-center text-2xl font-bold mb-4">Apply Leave</h2>
        <hr className="my-4" />
        <p>Name: {getName()}</p>
        <p>ID: {getemployeeId()}</p>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fromDate">From</Label>
            <TextInput
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="toDate">To</Label>
            <TextInput
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="applicationReason">Application Reason</Label>
          <Textarea
            id="applicationReason"
            rows={4}
            value={applicationReason}
            onChange={(e) => setApplicationReason(e.target.value)}
            placeholder={`Subject: [Your Subject Here]\nYour reason for application...\n\nSincerly:[Your Name]`}
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className=" bg-red-600 text-white px-4 py-1 rounded-md hover:shadow-xl hover:scale-105 "
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded-md hover:shadow-xl hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
