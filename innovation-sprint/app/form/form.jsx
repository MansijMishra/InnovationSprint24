import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client

const ProjectRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stakeholderGroupSponsor: "",
    businessUnitImpacted: "",
    priority: "",
    deadline: "",
    flexible: false,
    relatedToInvestor: false,
    relatedToTreasury: false,
    relatedToGovernment: false,
    hoursSavedOrImpacted: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    const { data, error } = await supabase.from("projects").insert([formData]);
    if (error) {
      console.error("Error saving data to Supabase:", error);
      return;
    }
    setFormData({
      name: "",
      email: "",
      stakeholderGroupSponsor: "",
      businessUnitImpacted: "",
      priority: "",
      deadline: "",
      flexible: false,
      relatedToInvestor: false,
      relatedToTreasury: false,
      relatedToGovernment: false,
      hoursSavedOrImpacted: "",
      description: "",
    });
    console.log("Form data saved to Supabase:", data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl mx-4">
        <header className="text-gray-700 text-3xl font-bold mb-8">
          Request a Project
        </header>

        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="mb-6">
            <div className="text-xl font-semibold mb-4">
              Contact Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="requestedBy"
                >
                  Requested by *
                </label>
                <input
                  id="requestedBy"
                  name = "name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange = {handleInputChange}
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name = "email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange = {handleInputChange}
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stakeholder"
                >
                  Stakeholder Group Sponsor *
                </label>
                <select
                  id="stakeholder"
                  name = "stakeholderGroupSponsor"
                  required
                  className="block appearance-none w-full border border-gray-400 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                  onChange = {handleInputChange}
                >
                  <option>Choose a unit</option>
                  <option>Private equity</option>
                  <option>Hedge fund</option>
                  <option>Philanthropy</option>
                  {/* Populate this with more options */}
                </select>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="mb-6">
            <div className="text-xl font-semibold mb-4">
              Project Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="businessUnit"
                >
                  Business Unit Impacted *
                </label>
                <select
                  id="businessUnit"
                  name = "businessUnitImpacted"
                  required
                  className="block appearance-none w-full border border-gray-400 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                  onChange = {handleInputChange}
                >
                  <option>Private equity</option>
                  <option>Hedge Fund</option>
                  <option>Etc.</option>
                  {/* Populate this with actual options */}
                </select>
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name = "priority"
                  className="block appearance-none w-full border border-gray-400 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                >
                  <option>1 - Urgent</option>
                  <option>2 - High</option>
                  <option>3 - Mid</option>
                  <option>4 - Low</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="deadline"
                >
                  Estimated Deadline *
                </label>
                <div className="flex items-center">
                  <input
                    id="deadline"
                    name = "deadline"
                    type="date"
                    required
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
                    onChange = {handleInputChange}
                  />

                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name = "flexible"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange = {handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Flexible</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name = "relatedToInvestor"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  onChange = {handleInputChange}
                />
                <span className="ml-2">Related to Investor Reporting?</span>
              </label>

              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name = "relatedToTreasury"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  onChange = {handleInputChange}
                />
                <span className="ml-2">Related to Treasury Management?</span>
              </label>

              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  name = "relatedToGovernment"
                  onChange =  {handleInputChange}
                />
                <span className="ml-2">Related to Government Reporting?</span>
              </label>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hours"
              >
                Hours Saved or hours impacted
              </label>
              <input
                id="hours"
                name = "hoursSavedOrImpacted"
                type="text"
                placeholder="Enter the number hours saved per Quarter"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange = {handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectDescription"
              >
                Project Description *
              </label>
              <textarea
                id="projectDescription"
                name = "description"
                placeholder="Enter a project description"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded flex items-center focus:outline-none focus:shadow-outline transition-colors duration-150"
            >
              Submit
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRequestForm;
