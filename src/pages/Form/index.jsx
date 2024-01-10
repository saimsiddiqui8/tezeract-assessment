import React, { useState } from 'react';
import "./form.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import db from "../../firebaseConfig.js"
import FormSection from './FormSection';
import FileUpload from './FileUpload';
import RoleRadioGroup from './RoleRadioGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Form() {
    const [radioValue, setRadioValue] = useState(null);
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [fileList, setFileList] = useState([]);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            interviewTime: 'morning',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log('Form submitted:', values);
        },
    });

    const storage = getStorage();

    const onChangeFile = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            // Uploading the photo to Firebase Storage
            const file = newFileList[0].originFileObj;
            const storageRef = ref(storage, `profile-photos/${file.name}`);
            await uploadBytes(storageRef, file);

            // Getting the download URL
            const downloadURL = await getDownloadURL(storageRef);
            setPhotoURL(downloadURL);
        }
    };


    const onPreviewFile = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        interviewTime: 'morning',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChangeRole = (e) => {
        console.log('radio checked', e.target.value);
        setRadioValue(e.target.value);
    };

    const handleToggleSwitchChange = (checked) => {
        setToggleSwitch(checked);
    };


    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        if (!formik.values.username || !formik.values.email || !formik.values.phone) {
            toast.error('Please fill in all the required fields.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        // Check if the user has uploaded an image
        if (fileList.length === 0) {
            toast.error('Please upload a profile picture.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        const userFormData = {
            username: formik.values.username,
            email: formik.values.email,
            phone: formik.values.phone,
            interviewTime: formik.values.interviewTime,
            role: toggleSwitch ? getRoleLabel(radioValue) : null,
        };

        try {
            const docRef = await addDoc(collection(db, 'users'), userFormData);
            console.log('Document written with ID: ', docRef.id);

            // Update the document with the profile photo URL
            await updateDoc(docRef, { profilePhotoURL: photoURL });

            // Reset the Formik form after successful submission
            formik.resetForm();

            setRadioValue(null);
            setToggleSwitch(false);
            setFileList([]);
            setPhotoURL(null);


            toast.success('User added successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (e) {
            console.error('Error adding document: ', e);

            // Display error
            toast.error('Error adding user. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };


    const getRoleLabel = (value) => {
        switch (value) {
            case 1:
                return 'Student';
            case 2:
                return 'Teacher';
            case 3:
                return 'Other';
            default:
                return null;
        }
    };
    return (
        <section className='container overflow-hidden' id='form'>
            <h3 className='pt-2'>User Form</h3>

            <FileUpload
                fileList={fileList}
                onChange={onChangeFile}
                onPreview={onPreviewFile}
            />

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <FormSection
                        label="Username:"
                        placeholder="Enter Username"
                        type="text"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.touched.username && formik.errors.username}
                    />
                    <FormSection
                        label="Email:"
                        placeholder="Enter Email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />

                </div>

                <div className="row">
                    <FormSection
                        label="Phone Number:"
                        placeholder="Enter Phone"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.touched.phone && formik.errors.phone}
                    />


                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 my-3">
                        <div className="label">
                            <label htmlFor="interviewTime">Interview Preferred Time:</label>
                        </div>
                        <div className="input">
                            <select
                                className='i-f'
                                id="interviewTime"
                                style={{ width: "100%" }}
                                name="interviewTime"
                                value={formData.interviewTime}
                                onChange={handleChange}
                                required
                            >
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>
                    </div>
                </div>

                <RoleRadioGroup
                    toggleSwitch={toggleSwitch}
                    onToggleSwitchChange={handleToggleSwitchChange}
                    radioValue={radioValue}
                    onChangeRadio={handleChangeRole}
                />
                <div className="text-end">

                    <button className='btn mb-4 me-4' onClick={handleSubmitBtn}>ADD USER</button>
                </div>
                <ToastContainer />
            </form>
        </section>
    )
}

export default Form;