import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Card, Image } from 'react-bootstrap';
import { addDoc, doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { database } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Docs() {
    const navigate = useNavigate();
    const [reload, setReload] = useState('');
    const [docData, setDocData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');  
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const collectionRef = collection(database, 'docsData');

    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }));
        });
    };

    const handleChange = (e) => {
        setTitle(e);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value); 
    };

    const addData = async () => {
        await addDoc(collectionRef, {
            title: title,
            description: '',
            imageUrl: imageUrl, 
        });
        setReload(title);
    };

    useEffect(() => {
        getData();
    }, [reload]);

    const handleAdd = async () => {
        await addData();
        toast.info(`${title} added successfully`);
        setTitle('');
        setImageUrl(''); 
        setShow(false);
    };

    const handleDelete = async (id) => {
        const docRef = doc(database, 'docsData', id);
        await deleteDoc(docRef);
        toast.warning('Document deleted');
        getData();
    };

    const getEdit = (data) => {
        navigate('/edit', { state: data });
    };

    const handleView = (data) => {
        navigate('/edit', { state: data });
    };

    const filteredDocs = docData.filter((doc) => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <div className='common'>
            <div className="container-fluid">
                <div className="d-flex justify-content-between">
                    <Button
                        className="add shadow mt-5"
                        style={{ height: '50px', width: '190px' , background: 'black', border:'none' }}
                        onClick={handleShow}
                    >
                        <span className="d-none d-sm-inline">ADD A DOCUMENT </span>
                        <span className="d-inline d-sm-none">
                            <i className="fa-solid fa-plus"></i>
                        </span>
                    </Button>
                    <Form.Control
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="mt-5"
                        style={{ height: '50px', width: '200px' , background: 'rgb(255, 255, 255,0.8)' , border:'none' }}
                    />
                    <Link to="/" style={{ height: '50px', width: '190px' , background: 'black', border:'none' }} className="btn text-decoration-none text-light mt-5">
                    <span className="d-none d-sm-inline">
                        GO BACK
                    </span>
                    <span className="d-inline d-sm-none">
                        <i className="fa-solid fa-arrow-right"></i> 
                    </span>
                    </Link>
                </div>


                <div className="row mt-5 justify-content-center">
                    {filteredDocs?.length > 0 ? filteredDocs.map((data) => (
                        <div className="col-12 col-sm-6 col-md-4 mb-4" key={data.id} style={{ width: '300px', cursor: 'pointer' }}>
                            <Card className="shadow" style={{ width: '18rem', background: 'rgb(255, 255, 255,0.7)' }} onClick={() => handleView(data)}>
                                {data.imageUrl && (
                                    <Image
                                    src={data.imageUrl}
                                    alt="Document"
                                      className="img-fluid card-img-top"
                                      style={{ height: '200px', width: '100%',  objectFit: 'cover'}} />
                                  )}
                                  <Card.Body>
                                      <Card.Title style={{ color: 'black' }} className="fw-bolder text-center fs-3 py-1">{data.title}</Card.Title>
                                      <div className="d-flex justify-content-evenly mt-2">
                                          <button onClick={(e) => { e.stopPropagation(); getEdit(data); }} className="btn text-warning"><i className="fa-solid fa-pen-to-square py-1"></i></button>
                                          <button onClick={(e) => { e.stopPropagation(); handleDelete(data.id); }} className="btn text-danger"><i className="fa-solid fa-trash py-1"></i></button>
                                      </div>
                                  </Card.Body>
                              </Card>
                          </div>
                      ))
                       :
                      <h4 className="text-light text-center">No documents found!!</h4>}
                  </div>
              </div>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputC"
                            type="text"
                            placeholder="Add title"
                            value={title}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <label htmlFor="floatingInputCustom">Add title</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingImageURL"
                            type="text"
                            placeholder="Enter image URL"
                            value={imageUrl}
                            onChange={(e) => handleImageUrlChange(e)}
                        />
                        <label htmlFor="floatingImageURL">Enter Image URL</label>
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd} variant="dark">Add</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-center" theme="colored" autoClose={3000} />
        </div>    
        </>
    );
}

export default Docs;