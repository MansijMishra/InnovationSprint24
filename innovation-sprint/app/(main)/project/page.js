"use client";
import { useState, useEffect } from 'react';
import { Download, SendHorizontal } from 'lucide-react';
import { Overview } from './overview/page';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

const Project = () => {
    // State to keep track of the active tab
    const router = useRouter();
    const [searchParams] = useSearchParams();

    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('overview');

    // State variables to trigger re-render
    const [projectName, setProjectName] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [sdlcStatusCount, setSdlcStatusCount] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    useEffect(() => {
        // Initialize an empty object to store the query parameters
        const paramsObj = {};

        // Assuming searchParams is an array of ['key', 'value', 'key', 'value', ...]
        for (let i = 0; i < searchParams.length; i += 2) {
            paramsObj[searchParams[i]] = searchParams[i + 1];
            console.log(searchParams[i + 1]);
        }
        

        // Now set the state values
        setProjectName(paramsObj['projectName'] || '');
        setBusinessUnit(paramsObj['businessUnit'] || '');
        setSdlcStatusCount(paramsObj['sdlcStatusCount'] || '');
        setProjectDescription(paramsObj['projectDescription'] || '');
    }, [searchParams]);


    // Function to change the active tab
    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const statusProps = {
        statusCount: sdlcStatusCount,
        statusTotal: '6',
        statusText: 'Implementation',
        notesText: projectDescription
    };

    // Components to render the content of each tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview {...statusProps}/>
            case 'reports':
                return <p>This is the Reports tab.</p>;
            case 'team':
                return <p>This is the Team tab.</p>;
            case 'stakeholders':
                return <p>This is the Stakeholders tab.</p>;
            default:
                return <p>No tab selected.</p>;
        }
    };
    

    return (
        <div className="w-11/12 mx-auto">
            <div className="flex justify-between items-center py-2">
                <div>
                    <h1 className="text-3xl font-semibold">{projectName}</h1>
                    <h2 className="text-base font-light">{businessUnit}</h2>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-black text-white flex items-center px-5 py-2 rounded-full">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                    </button>
                    <button className="bg-black text-white flex items-center px-5 py-2 rounded-full">
                        Send to
                        <SendHorizontal className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Space between header and navbar */}
            <div className="mt-6">
                <nav className="flex justify-start space-x-10">
                    {['overview', 'reports', 'team', 'stakeholders'].map((tabName) => (
                        <button
                            key={tabName}
                            onClick={() => changeTab(tabName)}
                            className={`text-black pb-2 ${activeTab === tabName ? 'border-b-2 border-black font-bold' : 'font-normal'}`}
                        >
                            {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="py-4">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Project;
