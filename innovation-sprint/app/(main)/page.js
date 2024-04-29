"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { supabase } from "../utils/supabaseClient";
import { TriangleAlert } from "lucide-react";
import clsx from "clsx";

const Dashboard = () => {
  const [current, setCurrent] = useState([]);
  const [future, setFuture] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: currentData, error: currentError } = await supabase
        .from("projects")
        .select()
        .neq("status", 0);

      const { data: futureData, error: futureError } = await supabase
        .from("projects")
        .select()
        .eq("status", 0);

      if (currentError) {
        console.error(currentError);
      } else {
        setCurrent(currentData);
      }

      if (futureError) {
        console.error(futureError);
      } else {
        setFuture(futureData);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (project) => {
    const queryParams = new URLSearchParams({
        projectName: project.name,
        businessUnit: project.business_unit,
        sdlcStatusCount: project.status.toString(),  // Ensure numbers are converted to strings
        projectDescription: project.description
    }).toString();

    const url = `/project?${queryParams}`;
    router.push(url);
};

  return (
    <div className="w-11/12 mx-auto h-full grid grid-rows-6 grid-cols-1">
      <div className="row-span-1 col-span-1">
        <p className="mt-4 text-4xl font-bold font-poppins">Dashboard</p>
      </div>
      <div className="row-span-4 col-span-1 flex flex-col gap-10">
        <div className="rounded-lg bg-white w-full h-fit p-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">Current Projects</p>
            <p className="text-base text-black/70 font-medium font-redHatText">
              {current.length} Projects
            </p>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="font-redHatText text-lg">
                <th className="text-start font-medium">ID</th>
                <th className="text-start font-medium">Project Name</th>
                <th className="text-start font-medium">Business Unit</th>
                <th className="text-start font-medium">Priority</th>
                <th className="text-start font-medium">Deadline</th>
                <th className="text-start font-medium">SDLC Step</th>
              </tr>
            </thead>
            <tbody>
              {current.map((project) => (
                <tr key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer text-base font-redHatText font-normal text-black/70 hover:bg-gray-100">
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.business_unit}</td>
                  <td className={clsx(
                      "flex items-center gap-2",
                      project.priority === 3 ? "text-red-400" :
                      project.priority === 2 ? "text-orange-300" :
                      "text-gray-400"
                    )}>
                    <TriangleAlert className="w-5 h-5" />
                    <p>{project.priority}</p>
                  </td>
                  <td>{project.deadline || 'N/A'}</td>
                  <td>{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg bg-white w-full h-fit p-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">Future Projects</p>
            <p className="text-base text-black/70 font-medium font-redHatText">
              {future.length} Projects
            </p>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="font-redHatText text-lg">
                <th className="text-start font-medium">ID</th>
                <th className="text-start font-medium">Project Name</th>
                <th className="text-start font-medium">Business Unit</th>
                <th className="text-start font-medium">Priority</th>
                <th className="text-start font-medium">Deadline</th>
                <th className="text-start font-medium">SDLC Step</th>
              </tr>
            </thead>
            <tbody>
              {future.map((project) => (
                <tr key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer text-base font-redHatText font-normal text-black/70 hover:bg-gray-100">
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.business_unit}</td>
                  <td className={clsx(
                      "flex items-center gap-2",
                      project.priority === 3 ? "text-red-400" :
                      project.priority === 2 ? "text-orange-300" :
                      "text-gray-400"
                    )}>
                    <TriangleAlert className="w-5 h-5" />
                    <p>{project.priority}</p>
                  </td>
                  <td>{project.deadline || 'N/A'}</td>
                  <td>{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
