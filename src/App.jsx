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

            await axios.delete(
                API + "/" + id
            );

            alert("Patient Deleted");

            loadPatients();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div style={{
            padding: "30px",
            fontFamily: "Arial"
        }}>

            <h1>
                Hospital Management System
            </h1>

            <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) =>
                    setPatientId(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Ward Type"
                value={wardType}
                onChange={(e) =>
                    setWardType(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                placeholder="Days"
                value={days}
                onChange={(e) =>
                    setDays(e.target.value)
                }
            />

            <br /><br />

            <button onClick={admitPatient}>
                Admit Patient
            </button>

            <hr />

            <h2>
                Patient Records
            </h2>

            {
                patients.map((p) => (

                    <div
                        key={p.patientId}
                        style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >

                        <p>
                            Patient ID:
                            {p.patientId}
                        </p>

                        <p>
                            Ward:
                            {p.wardType}
                        </p>

                        <p>
                            Days:
                            {p.days}
                        </p>

                        <button
                            onClick={() =>
                                deletePatient(
                                    p.patientId
                                )
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default App;