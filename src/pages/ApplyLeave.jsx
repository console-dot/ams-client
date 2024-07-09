import React, { useState, useRef } from "react";
import { CommonLayout } from "../layouts";
import { ApplyLeaveForm, Clock } from "../components";
import { Button, Modal } from "flowbite-react";
import { FaEye, FaTrash } from "react-icons/fa";

// Modal for viewing application details
const ViewApplicationModal = ({ application, onClose }) => {
  return (
    <Modal show={true} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-center text-2xl font-bold mb-4">
          Application Details
        </h2>
        <p>
          <span className="font-semibold">Name:</span> {application.name}
        </p>
        <p>
          <span className="font-semibold">ID:</span> {application.id}
        </p>
        <p>
          <span className="font-semibold">From:</span> {application.fromDate}
        </p>
        <p>
          <span className="font-semibold">To:</span> {application.toDate}
        </p>
        <p>
          <span className="font-semibold">Application Reason:</span>{" "}
          {application.applicationReason}
        </p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className=" bg-red-600 text-white px-4 py-1 rounded-md hover:shadow-xl hover:scale-105 ">Close</button>
        </div>
      </div>
    </Modal>
  );
};

export const ApplyLeave = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false); // State for view modal
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null); // State to hold selected application for viewing
  const modalRef = useRef(null);

  const calculateDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include end date
    return diffDays;
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    } else {
      return text;
    }
  };

  const handleFormSubmit = (formData) => {
    const daysApplied = calculateDays(formData.fromDate, formData.toDate);
    formData.daysApplied = daysApplied;
    setApplications([...applications, formData]);
    setModalOpen(false);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const openApplicationModal = (application) => {
    setSelectedApplication(application);
    setViewModalOpen(true); // Open view modal
  };

  const deleteApplication = (index) => {
    const updatedApplications = [...applications];
    updatedApplications.splice(index, 1); // Remove the application at the specified index
    setApplications(updatedApplications);
  };

  return (
    <CommonLayout>
      <div className="flex items-center justify-between p-5 bg-gray-50">
        <span className="font-semibold text-xl">
          <Clock />
        </span>
        <Button
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="btn"
        >
          Apply Leave
        </Button>
      </div>
      <Modal show={modalOpen} onClose={onCloseModal}>
        <div ref={modalRef}>
          <ApplyLeaveForm onSubmit={handleFormSubmit} onClose={onCloseModal} />
        </div>
      </Modal>
      <div className="mb-4 flex justify-center">
        <span className="text-2xl font-bold">Applied Leaves</span>
      </div>
      {applications.length > 0 && (
        <div className="mt-8 px-5 overflow-x-auto w-full">
          <table className="min-w-full border-collapse  md:table bg-white border border-gray-300">
            <thead className=" md:table-header-group">
              <tr className="border border-grey-500 md:border-none  md:table-row">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  #
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  Application Reason
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  From
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  To
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  Days
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  Status
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left  md:table-cell">
                  <div className="flex justify-center"> Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className=" md:table-row-group">
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className="bg-white border border-grey-500 md:border-none  md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    {index + 1}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    {truncateText(app.applicationReason, 5)}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    {app.fromDate}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    {app.toDate}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    {app.daysApplied}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight ${
                        app.status === "Pending"
                          ? "text-yellow-700 bg-yellow-100"
                          : app.status === "Approved"
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      } rounded-sm`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell">
                    <div className="flex justify-center items-center gap-2">
                      <div className="">
                        <button onClick={() => openApplicationModal(app)}>
                          <FaEye className="text-cyan-700 hover:scale-105 text-xl"/>
                        </button>
                      </div>
                      <div>
                        <button onClick={() => deleteApplication(index)}>
                          <FaTrash className="text-red-600 hover:scale-105 text-lg" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* View Application Modal */}
      {selectedApplication && viewModalOpen && (
        <ViewApplicationModal
          application={selectedApplication}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </CommonLayout>
  );
};
