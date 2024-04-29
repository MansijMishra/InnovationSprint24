export const Overview = ({ statusCount, statusTotal, statusText, notesText }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {/* Project Status Box - Made smaller */}
            <div className="flex flex-wrap gap-4 justify-between">
            {/* Project Status Box - Adjusted sizing and spacing */}
            <div className="bg-white p-6 shadow rounded-lg" style={{ width: '40%' }}>
                <h2 className="text-lg font-semibold mb-4">Project Status {statusCount}/{statusTotal}</h2>
                <div className="w-full bg-[#E6E6E6] rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(statusCount / statusTotal) * 100}%` }}></div>
                </div>
                <div className="text-center text-orange-500 text-lg font-semibold mt-4">{statusText}</div>
            </div>

            {/* Project Notes Box - Adjusted to take more space */}
            <div className="bg-white p-6 shadow rounded-lg flex-1">
                <h2 className="text-lg font-semibold">Project Notes</h2>
                <p className="mt-2 text-sm">{notesText}</p>
            </div>
        </div>

        {/* Current Sprint Box with increased height and adjusted layout */}
        <div className="bg-white p-4 shadow rounded-lg w-full" style={{ minHeight: '425px' }}> {/* Adjust minHeight as needed */}
            <h2 className="text-xl font-semibold pb-4">Current Sprint</h2>

            {/* Header row with a line below */}
            <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Task Name</span>
                <span className="font-semibold">Status</span>
                <span className="font-semibold text-right pr-4">Story Points</span>
            </div>
            <hr className="my-2 border-black" />

            {/* Task rows with adjusted status width and overall spacing */}
            <div className="grid grid-cols-3 gap-2">
                <span>Task 1</span>
                <span className="bg-blue-200 text-blue-800 text-sm px-2 inline-flex rounded-full" style={{ width: 'fit-content' }}>IN PROGRESS</span>
                <span className="text-right pr-4">4</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <span>Task 2</span>
                <span className="bg-gray-200 text-gray-800 text-sm px-2 inline-flex rounded-full" style={{ width: 'fit-content' }}>TO DO</span>
                <span className="text-right pr-4">2</span>
            </div>
            {/* White space after columns */}
            <div className="flex-grow"></div>
        </div>

        </div>
    );
};
