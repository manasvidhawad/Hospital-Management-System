import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const API =
        "https://hospitalbackend-6jwn.onrender.com/patients";

    const [patients, setPatients] = useState([]);

    const [patientId, setPatientId] = useState("");
    const [wardType, setWardType] = useState("");
    const [days, setDays] = useState("");

    const loadPatients = async () => {

        try {

            const response =
                await axios.get(API);

            setPatients(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        loadPatients();

    }, []);

    const admitPatient = async () => {

        try {

            await axios.post(
                API,
                {
                    patientId,
                    wardType,
                    days: parseInt(days)
                }
            );

            alert("Patient Added Successfully");

            setPatientId("");
            setWardType("");
            setDays("");

            loadPatients();

        } catch (error) {

            console.log(error);

            alert("Error adding patient");
        }
    };

    const deletePatient = async (id) => {

        try {

            await axios.delete(API + "/" + id);

            loadPatients();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f9",
                padding: "40px",
                fontFamily: "Arial"
            }}
        >

            <div
                style={{
                    maxWidth: "800px",
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#1e3a8a"
                    }}
                >
                    Hospital Management System
                </h1>

                <input
                    type="text"
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) =>
                        setPatientId(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Ward Type"
                    value={wardType}
                    onChange={(e) =>
                        setWardType(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Days"
                    value={days}
                    onChange={(e) =>
                        setDays(e.target.value)
                    }
                    style={inputStyle}
                />

                <button
                    onClick={admitPatient}
                    style={buttonStyle}
                >
                    Admit Patient
                </button>

                <h2
                    style={{
                        marginTop: "40px",
                        marginBottom: "20px"
                    }}
                >
                    Patient Records
                </h2>

                {
                    patients.map((p) => (

                        <div
                            key={p.patientId}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "15px",
                                backgroundColor: "#fafafa"
                            }}
                        >

                            <p>
                                <strong>Patient ID:</strong>
                                {" "}
                                {p.patientId}
                            </p>

                            <p>
                                <strong>Ward:</strong>
                                {" "}
                                {p.wardType}
                            </p>

                            <p>
                                <strong>Days:</strong>
                                {" "}
                                {p.days}
                            </p>

                            <button
                                onClick={() =>
                                    deletePatient(
                                        p.patientId
                                    )
                                }
                                style={deleteButtonStyle}
                            >
                                Delete
                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
};

const deleteButtonStyle = {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer"
};

export default App;