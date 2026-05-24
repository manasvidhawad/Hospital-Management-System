import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {

    const API =
        "https://hospitalbackend-6jwn.onrender.com/patients";

    // STATES

    const [patientId, setPatientId] =
        useState("");

    const [wardType, setWardType] =
        useState("ICU");

    const [days, setDays] =
        useState("");

    const [patients, setPatients] =
        useState([]);

    const [selectedPatient, setSelectedPatient] =
        useState(null);

    const [bill, setBill] =
        useState(null);

    // BEDS

    const totalBeds = 5;

    const availableBeds =
        totalBeds - patients.length;

    // FETCH PATIENTS

    const fetchPatients = async () => {

        try {

            const response =
                await axios.get(API);

            setPatients(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // LOAD DATA

    useEffect(() => {

        fetchPatients();

    }, []);

    // ADD PATIENT

    const addPatient = async (e) => {

        e.preventDefault();

        try {

            const patientData = {

                patientId:
                    patientId.trim(),

                wardType:
                    wardType.trim(),

                days:
                    Number(days)
            };

            console.log(patientData);

            await axios.post(
                API,
                patientData
            );

            alert(
                "Patient Added Successfully"
            );

            fetchPatients();

            setPatientId("");

            setWardType("ICU");

            setDays("");

        } catch (error) {

            console.log(error);

            alert(
                "Error adding patient"
            );
        }
    };

    // DELETE PATIENT

    const deletePatient = async (id) => {

        try {

            await axios.delete(
                `${API}/${id}`
            );

            fetchPatients();

        } catch (error) {

            console.log(error);
        }
    };

    // SELECT PATIENT

    const selectPatient = (patient) => {

        setSelectedPatient(patient);

        setBill(null);
    };

    // CALCULATE BILL

    const calculateBill = () => {

        if (!selectedPatient) return;

        let total = 0;

        if (
            selectedPatient.wardType === "ICU"
        ) {

            total =
                selectedPatient.days * 5000;

        } else {

            total =
                selectedPatient.days * 1000;
        }

        setBill(total);
    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold text-center mb-10 text-blue-700">

                    Hospital Management System

                </h1>

                {/* FORM */}

                <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

                    <h2 className="text-3xl font-semibold mb-8 text-gray-700">

                        Patient Management

                    </h2>

                    <form
                        onSubmit={addPatient}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-lg font-medium text-gray-700 mb-3">

                                Patient ID

                            </label>

                            <input
                                type="text"

                                value={patientId}

                                onChange={(e) =>
                                    setPatientId(
                                        e.target.value
                                    )
                                }

                                placeholder="Enter Patient ID"

                                className="w-full p-4 border rounded-2xl text-lg"
                            />

                        </div>

                        <div>

                            <label className="block text-lg font-medium text-gray-700 mb-3">

                                Ward Type

                            </label>

                            <select

                                value={wardType}

                                onChange={(e) =>
                                    setWardType(
                                        e.target.value
                                    )
                                }

                                className="w-full p-4 border rounded-2xl text-lg"
                            >

                                <option>
                                    ICU
                                </option>

                                <option>
                                    General Ward
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-lg font-medium text-gray-700 mb-3">

                                Number of Days

                            </label>

                            <input
                                type="number"

                                value={days}

                                onChange={(e) =>
                                    setDays(
                                        e.target.value
                                    )
                                }

                                placeholder="Enter Number of Days"

                                className="w-full p-4 border rounded-2xl text-lg"
                            />

                        </div>

                        <button
                            type="submit"

                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-xl font-semibold"
                        >

                            Admit Patient

                        </button>

                    </form>

                </div>

                {/* DASHBOARD */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* TABLE */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-semibold mb-8 text-gray-700">

                            Patient Records

                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full border-collapse">

                                <thead>

                                    <tr className="bg-blue-100 text-gray-700">

                                        <th className="p-5 text-left">
                                            Select
                                        </th>

                                        <th className="p-5 text-left">
                                            Patient ID
                                        </th>

                                        <th className="p-5 text-left">
                                            Ward Type
                                        </th>

                                        <th className="p-5 text-left">
                                            Days
                                        </th>

                                        <th className="p-5 text-left">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                {
                                    patients.map((patient) => (

                                        <tr
                                            key={patient.patientId}

                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-5">

                                                <input
                                                    type="radio"

                                                    name="selectedPatient"

                                                    onChange={() =>
                                                        selectPatient(patient)
                                                    }
                                                />

                                            </td>

                                            <td className="p-5 text-lg">

                                                {patient.patientId}

                                            </td>

                                            <td className="p-5 text-lg">

                                                {patient.wardType}

                                            </td>

                                            <td className="p-5 text-lg">

                                                {patient.days}

                                            </td>

                                            <td className="p-5">

                                                <button

                                                    onClick={() =>
                                                        deletePatient(
                                                            patient.patientId
                                                        )
                                                    }

                                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
                                                >

                                                    Discharge

                                                </button>

                                            </td>

                                        </tr>
                                    ))
                                }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* SIDE PANEL */}

                    <div className="space-y-8">

                        {/* BILL */}

                        <div className="bg-white rounded-3xl shadow-lg p-8">

                            <h2 className="text-3xl font-semibold mb-6 text-gray-700">

                                Calculate Bill

                            </h2>

                            {
                                selectedPatient && (

                                    <div className="mb-6">

                                        <p className="text-lg text-gray-700">

                                            Selected Patient:

                                        </p>

                                        <h3 className="text-2xl font-bold text-blue-700">

                                            {selectedPatient.patientId}

                                        </h3>

                                    </div>
                                )
                            }

                            <button

                                onClick={calculateBill}

                                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-semibold"
                            >

                                Generate Bill

                            </button>

                            {
                                bill !== null && (

                                    <div className="mt-8 bg-green-100 p-6 rounded-2xl">

                                        <h3 className="text-4xl font-bold text-green-700 text-center">

                                            ₹ {bill}

                                        </h3>

                                    </div>
                                )
                            }

                        </div>

                        {/* BEDS */}

                        <div className="bg-white rounded-3xl shadow-lg p-8">

                            <h2 className="text-3xl font-semibold mb-6 text-gray-700">

                                Bed Availability

                            </h2>

                            <div className="bg-blue-100 p-8 rounded-2xl text-center">

                                <h3 className="text-6xl font-bold text-blue-700">

                                    {availableBeds}

                                </h3>

                                <p className="text-gray-600 text-xl mt-4">

                                    Beds Available

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}