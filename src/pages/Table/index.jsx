import React, { useEffect, useState } from 'react';
import "./table.css";
import DataTable from '../../components/DataTable';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebaseConfig.js';


function Table() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersData = usersSnapshot.docs.map(doc => doc.data());
                setUserData(usersData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <section className='container' id='table'>
            <h3 className='pt-4 mb-4'>User Table</h3>
            <div className="container">
                <DataTable data={userData} />
            </div>
        </section>
    )
}

export default Table;
