import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { database } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
  const location = useLocation();
  const data = location.state;

  const [disdoc, setDisdoc] = useState(data.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (value) => {
    setDisdoc(value);
  };

  const editDescription = async () => {
    const documentRef = doc(database, 'docsData', data.id); 
    await updateDoc(documentRef, {
      description: disdoc
    });
    toast.success('Document saved successfully!');
  };

  const handleSave = () => {
    editDescription();
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
    <div className='common'>
      <div className="container min-vh-100 rounded shadow mt-2 mb-2">
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary mt-5" onClick={toggleEditMode}>
            {isEditing ? 'Cancel Edit' : 'Edit Document'}
          </button>
          <Link to="/docs" className="btn btn-dark text-decoration-none mt-5">
            <i className="fa-solid fa-arrow-backward"></i> Go Back
          </Link>
        </div>


        <h2 className="mt-5 fw-bolder text-center">{data.title}</h2>

        {isEditing ? (
          <>

            <ReactQuill
              className="mt-2"
              placeholder="Type here...."
              theme="snow"
              value={disdoc}
              onChange={handleChange}
            />

            <div className="mt-3 d-flex justify-content-center">
              <button className="btn btn-danger" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3">
              <div dangerouslySetInnerHTML={{ __html: disdoc }} />
            </div>
          </>
        )}

      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

    </div>
    </>
  );
}

export default Edit;
