"use client";
import { Check, CirclePlus, Loader, RotateCcw, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import clsx from "clsx";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const queryRequests = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("requests").select();
      if (error) {
        throw error;
      } else if (data) {
        setRequests(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ApproveRequest = async () => {
    try {
        const { error } = await supabase
        .from('projects')
        // Need to actually update ROI
        .insert({ name: selectedRequest.project_name, business_unit: selectedRequest.business_unit, stakeholder: selectedRequest.stakeholder, ROI: 300, status: 0, description: selectedRequest.project_notes, priority: selectedRequest.priority, requested_by: selectedRequest.requested_by})
        if(error){
            throw error;
        }
        deleteRequest()
    } catch (error) {
        console.error(error)
    }
  }

  const deleteRequest = async () => {
    try {
        const { error } = await supabase
            .from('requests')
            .delete()
            .eq('id', selectedRequest.id)
        if(error) {
            throw error;
        }
        queryRequests().then(() => setIsLoading(false));
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    queryRequests().then(() => {
        setIsLoading(false)
    });
  }, []);

  return isLoading ? <div className="w-full h-full flex items-center justify-center"><Loader className="w-5 h-5 text-black animate-spin" /></div> : (
    <div className="w-11/12 mx-auto h-full grid grid-cols-1 grid-rows-12">
      <div className="row-span-2 col-span-1 flex items-center justify-between">
        <div className="w-full flex flex-col gap-2">
          <p className="text-3xl font-bold font-poppins">Requests</p>
          <p className="text-base font-medium font-redHatText text-black/60">
            Browse requests submitted here.
          </p>
        </div>
        <div className="">
          <button className="rounded-lg bg-orange-300 hover:bg-orange-400 transition-colors text-white font-redHatText flex items-center justify-center gap-2 w-52 h-12">
            <CirclePlus className="w-5 h-5" />
            <p className="text-lg font-medium">Create Request</p>
          </button>
        </div>
      </div>
      <div className="row-span-10 col-span-1">
        <div className="h-full w-full grid grid-rows-12 grid-cols-1">
          <div className="row-span-1 col-span-1">
            <div className="h-full w-full flex justify-end">
              <div className="flex gap-2 items-center text-blue-400 hover:text-blue-500 transition-colors mr-2 cursor-pointer" onClick={() => queryRequests().then(() => setIsLoading(false))}>
                <RotateCcw className="w-5 h-5" />
                <p className="text-lg font-medium font-redHatText">Refresh</p>
              </div>
            </div>
          </div>
          {/* Table goes here */}
          <div className="row-span-10 col-span-1 flex flex-col gap-2">
            <div className="w-full h-fit overflow-hidden rounded-xl border-2 border-black/15">
              <table class="table-fixed w-full h-fit">
                <thead className="bg-black/10 rounded-xl">
                  <tr className="font-redHatText font-semibold text-lg text-black/60">
                    <th className="py-2">
                      <p className="font-semibold">PROJECT NAME</p>
                    </th>
                    <th>
                      <p className="font-semibold">DEADLINE</p>
                    </th>
                    <th>
                      <p className="font-semibold">BUSINESS UNIT</p>
                    </th>
                    <th>
                      <p className="font-semibold">REQUESTED BY</p>
                    </th>
                    <th>
                      <p className="font-semibold">STAKEHOLDER</p>
                    </th>
                    <th>
                      <p className="font-semibold">RISK</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => {
                    return (
                      <tr className="text-base font-redHatText font-normal text-black/100 h-14">
                        <td className="flex items-center px-4 gap-4 h-full">
                          <input
                            onChange={() => {
                              setSelectedRequest(request);
                            }}
                            type="checkbox"
                          />
                          {request.project_name}
                        </td>
                        <td className="text-center">
                          {request.deadline === null
                            ? "Flexible"
                            : formatDate(request.deadline)}
                        </td>
                        <td className="text-center">{request.business_unit}</td>
                        <td className="text-center">{request.requested_by}</td>
                        <td className="text-center">{request.stakeholder}</td>
                        <td className="text-center">{request.risk}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={clsx("w-full gap-4 justify-end items-center", selectedRequest === null ? "hidden" : "flex")}>
                <button className="px-4 py-2 text-white bg-green-400 hover:bg-green-500 transition-colors rounded-md flex items-center gap-2" onClick={() => ApproveRequest()}>
                    <Check className="w-5 h-5" />
                    <p className="font-redHatText font-medium">Approve</p>
                </button>
                <button className="px-4 py-2 text-white bg-red-400 hover:bg-red-500 transition-colors rounded-md flex items-center gap-2" onClick={() => deleteRequest()}>
                    <X className="w-5 h-5" />
                    <p className="font-redHatText font-medium">Deny</p>
                </button>
                <button className="px-4 py-2 text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    <p className="font-redHatText font-medium">Send Back</p>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
