import React from 'react';

const Form = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-gray-900 text-2xl font-bold mb-4">Request a Project</h1>
          <div className="border-t border-gray-300" />
        </div>
        <form>
          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestedBy">
              Requested by *
            </label>
            <input
              id="requestedBy"
              type="text"
              placeholder="Your name"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Project Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessUnit">
              Business Unit Impacted *
            </label>
            <select
              id="businessUnit"
              required
              className="block appearance-none w-full border border-gray-400 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-green-500"
            >
              <option>Choose a unit</option>
              {/* Populate this with actual options */}
              <option>Unit One</option>
              <option>Unit Two</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stakeholder">
              Stakeholder (Group Sponsor) *
            </label>
            <input
              id="stakeholder"
              type="text"
              placeholder="Stakeholder"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-6 flex flex-col">
            <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700 text-sm">Related to Investor Reporting?</span>
            </label>
            <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700 text-sm">Related to Treasury Management?</span>
            </label>
            <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700 text-sm">Related to Government Reporting?</span>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Estimated Deadline *
            </label>
            <input
              id="deadline"
              type="date"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">
              Project Description *
            </label>
            <textarea
              id="projectDescription"
              placeholder="Enter a project description"
              required
              className="h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
