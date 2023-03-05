/* eslint-disable */
import { type NextPage } from "next";
// import Link from "next/link";
// import Image from "next/image";
import { Bar } from 'react-chartjs-2';
import { DashboardHeader } from "~/components/DashboardHeader";

import BasicTable from "~/components/UsersTable"
const Employees: NextPage = () => {

    return (
        <>
            <DashboardHeader />
            <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-22 h-[34rem] sm:h-[39rem]">
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
                <div className="m-5">
                    <div className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                        <h1>Employees</h1>
                        <BasicTable/>
                    </div>
                </div>
            </div>
        </>)
}

export default Employees;