/* eslint-disable */
import { type NextPage } from "next";
// import Link from "next/link";
// import Image from "next/image";
import { Bar } from 'react-chartjs-2';
import { DashboardHeader } from "~/components/DashboardHeader";

const Certificates: NextPage = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    }
    return (
        <>
            <DashboardHeader />
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 h-[34rem] sm:h-[39rem]">
                <svg
                    viewBox="0 0 1097 845"
                    aria-hidden="true"
                    className="hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]"
                >
                    <path
                        fill="url(#10724532-9d81-43d2-bb94-866e98dd6e42)"
                        fillOpacity=".2"
                        d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
                    />
                    <defs>
                        <linearGradient
                            id="10724532-9d81-43d2-bb94-866e98dd6e42"
                            x1="1097.04"
                            x2="-141.165"
                            y1=".22"
                            y2="363.075"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#2C295D" />
                            <stop offset={1} stopColor="#81254C" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg
                    viewBox="0 0 1097 845"
                    aria-hidden="true"
                    className="absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0"
                >
                    <path
                        fill="url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)"
                        fillOpacity=".2"
                        d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
                    />
                    <defs>
                        <linearGradient
                            id="8ddc7edb-8983-4cd7-bccb-79ad21097d70"
                            x1="1097.04"
                            x2="-141.165"
                            y1=".22"
                            y2="363.075"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#81254C" />
                            <stop offset={1} stopColor="#FF4694" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="flex space-x-4 justify-center box">
                    <div
                        className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Certificates emited
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                            </svg>
                            <Bar
                                data={data}
                                width={1200}
                                height={300}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                        </p>
                    </div>
                    {/* <div
                        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Card title
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </p>
                        <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Button
                        </button>
                    </div>
                    <div
                        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Card title
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </p>
                        <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Button
                        </button>
                    </div> */}
                </div>
            </div>
        </>)
}

export default Certificates;