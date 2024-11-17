import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';
import { Pagination } from 'react-bootstrap';

const Datapengguna = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [userData, setUserData] = useState({
        id: '',
        jurusan_id: '',
        username: '',
        password: '',
        nama_user: '',
        no_hp: '',
        ttd: '',
        role: '' // Menambahkan state untuk menyimpan nilai role
    });
    const [users, setUsers] = useState([]);
    const [jurusans, setJurusan] = useState([]);

    const [selectedRole, setSelectedRole] = useState(''); // State untuk menyimpan nilai role yang dipilih
    
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [jurusanIdError, setJurusanIdError] = useState(false);
    // const [nohpErrorMessage, setNohpErrorMessage] = useState('');
    const [ttdErrorMessage, setTtdErrorMessage] = useState('');
    const [namaUserError, setNamaUserError] = useState(false);
    const [noHpError, setNoHpError] = useState(false);
    const [ttdError, setTtdError] = useState(false);
    const [roleError, setRoleError] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Set halaman ke 1 saat pencarian berubah
    };

    const filteredData = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nama_user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10); // Ubah sesuai kebutuhan Anda

    // Hitung jumlah total data
    const totalData = users.length;

    // Hitung startIndex dan endIndex berdasarkan currentPage dan perPage
    const startIndex = (currentPage - 1) * dataPerPage + 1;
    const endIndex = Math.min(startIndex + dataPerPage - 1, totalData);


    // Hitung indeks data awal dan akhir untuk halaman saat ini
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    // Potong data sesuai dengan indeks data awal dan akhir
    const currentData = users.slice(indexOfFirstData, indexOfLastData);

    // Hitung jumlah total halaman
    const totalPages = Math.ceil(users.length / dataPerPage);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const validateForm = () => {
        let isValid = true;
        // Validasi input jurusan dipilih
        if (!userData.jurusan_id) {
            setJurusanIdError(true);
            isValid = false;
        } else {
            setJurusanIdError(false);
        }
    
        // Validasi input username
        if (!userData.username) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }
    
        // Validasi input password
        if (!userData.password) {
            setPasswordError(true);
            setPasswordErrorMessage("Password wajib diisi!");
            isValid = false;
        } else if (userData.password.length < 6 || userData.password.length > 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password harus terdiri dari 6 karakter!");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
    
        // Validasi input nama user
        if (!userData.nama_user) {
            setNamaUserError(true);
            isValid = false;
        } else {
            setNamaUserError(false);
        }
    
        // Validasi input no HP
        if (!userData.no_hp) {
            setNoHpError(true);
            isValid = false;
        } else {
            setNoHpError(false);
        }
    
        // Validasi input role
        if (!selectedRole) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }
    
        // Validasi tanda tangan (TTD)
        if (userData.ttd) {
            // Validasi gambar hanya jika ada gambar yang diunggah
            if (userData.ttd instanceof File) {
                // Periksa ekstensi file
                const allowedExtensions = /(\.png)$/i;
                const fileName = userData.ttd.name;
                if (!allowedExtensions.exec(fileName)) {
                    setTtdError(true);
                    setTtdErrorMessage('Format tanda tangan harus PNG!');
                    isValid = false;
                }
        
                // Periksa ukuran file
                if (userData.ttd.size > 2 * 1024 * 1024) {
                    setTtdError(true);
                    setTtdErrorMessage('Ukuran tanda tangan tidak boleh lebih dari 2 MB!');
                    isValid = false;
                }
            }
        }
        
    
        return isValid;
    };



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        window.location.reload();
        setShow(false);
    };

    const showModal = (userData) => {
        console.log(userData); // Cek nilai userData sebelum menampilkan modal
        setUserData({
            ...userData,
        jurusanId: userData.jurusan_id});
        setSelectedRole(userData.role); // Menetapkan selectedRole saat modal ditampilkan
        setShow(true);
    };
    
    

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (userData) => {
        setUserData(userData);
        setShowDelete(true);
    };

    const closeModalAdd = () => {
        window.location.reload();
        setShowAdd(false);
    };

    const showModalAdd = () => {
        setShowAdd(true);
    };

    const AddDataUser = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        // Jika ada gambar yang diunggah, lakukan validasi gambar
        if (userData.ttd instanceof File) {
            // Validasi format file gambar
            const allowedExtensions = /(\.png)$/i;
            if (!allowedExtensions.exec(userData.ttd.name)) {
                alert('Format gambar harus PNG!');
                return;
            }

            // Validasi ukuran file gambar
            if (userData.ttd.size > 2 * 1024 * 1024) {
                alert('Ukuran gambar tidak boleh lebih dari 2 MB!');
                return;
            }
        }
        try {
            const formData = new FormData();
            formData.append('jurusan_id', userData.jurusan_id);
            formData.append('username', userData.username);
            formData.append('password', userData.password);
            formData.append('nama_user', userData.nama_user);
            formData.append('no_hp', userData.no_hp);
            formData.append('ttd', userData.ttd);
            formData.append('role', selectedRole); // Menggunakan selectedRole yang dipilih

            console.log('Data yang akan dikirim:', {
                jurusan_id: userData.jurusan_id,
                username: userData.username,
                password: userData.password,
                nama_user: userData.nama_user,
                no_hp: userData.no_hp,
                ttd: userData.ttd,
                role: selectedRole
            });

            await axios.post('http://localhost:8000/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowAdd(false);
          
            window.location.reload();
            alert("Data berhasil ditambahkan");
        } catch (error) {
            alert("Data gagal ditambahkan");
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error)
                // Set pesan kesalahan dari server
            } else {
                console.error('Error adding user:', error);
            }
        }
    };

    const DeleteDataUser = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userData.id}`);
            setShowDelete(false);
            window.location.reload();
            alert("Data berhasil dihapus");
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Data gagal dihapus");
        }
    };

    const UpdateDataUser = async (e) => {
        e.preventDefault();
        console.log('Profile yang akan dikirim:', userData);
        // Validasi input jurusan dipilih
        if (!userData.jurusan_id) {
            setJurusanIdError(true);
            return;
        } else {
            setJurusanIdError(false);
        }

        // Validasi input username
        if (!userData.username) {
            setUsernameError(true);
            return;
        } else {
            setUsernameError(false);
        }

        // Validasi input nama user
        if (!userData.nama_user) {
            setNamaUserError(true);
            return;
        } else {
            setNamaUserError(false);
        }
    
        // Validasi input no HP
        if (!userData.no_hp) {
            setNoHpError(true);
            return;
        } else {
            setNoHpError(false);
        }

        // Validasi input role
        if (!selectedRole) {
            setRoleError(true);
            return;
        } else {
            setRoleError(false);
        }

        // Validasi password hanya jika pengguna ingin mengubahnya
        if (userData.password) {
            // Jika pengguna memasukkan password baru, validasi password
            if (userData.password.length < 6 || userData.password.length > 6) {
                setPasswordError(true);
                setPasswordErrorMessage("Password harus terdiri dari 6 karakter!");
                return;
            } else {
                setPasswordError(false);
                setPasswordErrorMessage("");
            }
        }


        try {
            const missingFields = [];
            if (!userData.username) missingFields.push('Username');
            if (!userData.nama_user) missingFields.push('Nama User');
            if (!userData.no_hp) missingFields.push('NoHp');
            if (!selectedRole) missingFields.push('Role');
    
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}.`);
            }

            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('nama_user', userData.nama_user);
            formData.append('no_hp', userData.no_hp);
            formData.append('jurusan_id', parseInt(userData.jurusan_id));
            formData.append('role', selectedRole);

            if (userData.password) {
                formData.append('password', userData.password);
            }

            if (userData.ttd instanceof File) {
                formData.append('ttd', userData.ttd);
            }
    
            await axios.post(`http://localhost:8000/api/users/update/${userData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShow(false);
            window.location.reload();
            alert("Update data berhasil");
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Update data gagal");
        }
    };
    
    
    
    
    
    


    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Slidebar />
            </div>
            <div className={`main ${isSidebarOpen ? 'shifted' : ''}`}>
                <div class="topbar">
                    <div class="toggle" onClick={toggleSidebar} >
                        <FontAwesomeIcon icon={faBars} /> 
                    </div>
                    <div class="search">
                        <label>
                            <input type="text" placeholder="Search here"  value={searchQuery} onChange={handleSearch} />
                            <FontAwesomeIcon className="icon" icon={faSearch} /> 
                        </label>
                    </div>
                    {/* <div class="user">
                        <img src={avatar} alt="" />
                    </div> */}
                </div>
                <div className='datapengguna' >
                    <div className='body-flex'>
                        <div className='flex mx-6 d-flex justify-content-center'>
                            <div className='col-11 p-6'>
                                <h2 className='mb-3'style={{ backgroundColor: '#38A3A5', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Pengguna</h2>
                                {/* Modal DELETE */}
                                <Modal show={showDelete} onHide={closeModalDelete} centered>
                                    
                                    <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger mb-3" style={{ fontSize: '6em' }} />
                                        <h4>Apakah anda yakin?</h4>
                                        <p>Data yang sudah dihapus mungkin tidak bisa dikembalikan lagi!</p>
                                        <Button variant="primary" onClick={closeModalDelete}>Batal</Button>
                                        &nbsp;
                                        &nbsp;
                                        <Button variant="danger" onClick={DeleteDataUser}>Hapus</Button>
                                    </Modal.Body>
                                </Modal>

                                <Modal show={show} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Form Update Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={UpdateDataUser}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, username: e.target.value });
                                                        setUsernameError(false);
                                                    }}
                                                    value={userData.username}
                                                />
                                                {usernameError && <p style={{ color: 'red' }}>Username wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Masukkan password baru"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, password: e.target.value });
                                                        setPasswordError(false);
                                                    }}
                                                    value={userData.password}
                                                />
                                                {passwordError && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, nama_user: e.target.value });
                                                        setNamaUserError(false);
                                                    }}
                                                    value={userData.nama_user}
                                                />
                                                {namaUserError && <p style={{ color: 'red' }}>Nama user wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No Hp</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, no_hp: e.target.value });
                                                        setNoHpError(false);
                                                    }}
                                                    value={userData.no_hp}
                                                />
                                                {noHpError && <p style={{ color: 'red' }}>Nomor HP wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputRole">
                                                <Form.Label>Role</Form.Label>
                                                <Dropdown style={{ width: '100%' }}>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        id="dropdown-basic"
                                                        style={{
                                                            width: '100%',
                                                            borderWidth: '1px',
                                                            borderColor: 'lightgray',
                                                            textAlign: 'left', 
                                                        }}
                                                    >
                                                        {userData.role || "Pilih Role"}
                                                        
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu
                                                        align="end"
                                                        style={{ width: '100%', textAlign: 'left' }}
                                                    >
                                                        <Dropdown.Item onClick={() => setUserData({ ...userData, role: 'admin' })}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setUserData({ ...userData, role: 'pengajar' })}>Pengajar</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setUserData({ ...userData, role: 'peserta' })}>Peserta</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setUserData({ ...userData, role: 'pengawas' })}>Pengawas</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelectJurusan">
                                                    <Form.Label>Jurusan</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        onChange={(e) => setUserData({...userData, jurusan_id: e.target.value})} // Pastikan nilai jurusanId diatur dengan benar
                                                        value={userData.jurusan_id}
                                                    >
                                                        <option value="">Pilih Jurusan</option>
                                                        {jurusans.map(jurusan => (
                                                            <option key={jurusan.id} value={jurusan.id}>{jurusan.nama_jurusan}</option>
                                                        ))}
                                                    </Form.Control>
                                                    {jurusanIdError && <p style={{ color: 'red' }}>Jurusan wajib dipilih!</p>}
                                            </Form.Group>
                                            <Button type='submit' color="primary" className="px-4">Simpan</Button>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Modal ADD */}
                                <Modal show={showAdd} onHide={closeModalAdd}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Tambah Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={AddDataUser}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, username: e.target.value });
                                                        setUsernameError(false);
                                                    }}
                                                    value={userData.username}
                                                />
                                                {usernameError && <p style={{ color: 'red' }}>Username wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, password: e.target.value });
                                                        setPasswordError(false);
                                                    }}
                                                    value={userData.password}
                                                />
                                                {passwordError && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, nama_user: e.target.value });
                                                        setNamaUserError(false);
                                                    }}
                                                    value={userData.nama_user}
                                                />
                                                {namaUserError && <p style={{ color: 'red' }}>Nama user wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No HP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, no_hp: e.target.value });
                                                        setNoHpError(false);
                                                    }}
                                                    value={userData.no_hp}
                                                />
                                                {noHpError && <p style={{ color: 'red' }}>Nomor HP wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputRole">
                                                <Form.Label>Role</Form.Label>
                                                <Dropdown style={{ width: '100%' }}>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        id="dropdown-basic"
                                                        style={{
                                                            width: '100%',
                                                            borderWidth: '1px',
                                                            borderColor: 'lightgray',
                                                            textAlign: 'left', 
                                                        }}
                                                    >
                                                        {userData.role || "Pilih Role"}
                                                        
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu
                                                        align="end"
                                                        style={{ width: '100%', textAlign: 'left' }}
                                                    >
                                                        <Dropdown.Item onClick={() => {setSelectedRole('admin');setRoleError(false);setUserData({...userData, role: 'admin'});}}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('sarpras');setRoleError(false);setUserData({...userData, role: 'sarpras'});}}>Sarpras</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('ketua_program');setRoleError(false);setUserData({...userData, role: 'ketua_program'});}}>Ketua Program Keahlian</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('kepsek');setRoleError(false);setUserData({...userData, role: 'kepsek'});}}>Kepala Sekolah</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('guru');setRoleError(false);setUserData({...userData, role: 'guru'});}}>Guru</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('siswa');setRoleError(false);setUserData({...userData, role: 'siswa'});}}>Siswa</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {roleError && <p style={{ color: 'red' }}>Role wajib dipilih!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelectJurusan">
                                                    <Form.Label>Jurusan</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        onChange={(e) => setUserData({...userData, jurusan_id: e.target.value})} // Pastikan nilai jurusanId diatur dengan benar
                                                        value={userData.jurusan_id}
                                                    >
                                                        <option value="">Pilih Jurusan</option>
                                                        {jurusans.map(jurusan => (
                                                            <option key={jurusan.id} value={jurusan.id}>{jurusan.nama_jurusan}</option>
                                                        ))}
                                                    </Form.Control>
                                                    {jurusanIdError && <p style={{ color: 'red' }}>Jurusan wajib dipilih!</p>}
                                            </Form.Group>


                                            <Button type='submit' color="primary" className="px-4">Tambah</Button>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModalAdd}>Close</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button className='mt-3 mb-3' variant="success" onClick={showModalAdd}>
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Data
                                </Button>
                                <Table striped bordered hover responsive className="font-ubuntu" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                    <thead style={{ backgroundColor: '#436850', color: 'white' }}>
                                        <tr>
                                        <th>No</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Role</th>
                                        <th>Points</th>
                                        <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.slice(indexOfFirstData, indexOfLastData).map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{indexOfFirstData + index + 1}</td>
                                                {/* <td>{user.id}</td> */}
                                                <td>{user.username}</td>
                                                {/* <td>{user.password}</td> */}
                                                <td>{user.nama_user}</td>
                                                <td>{user.no_hp}</td>
                                                <td><img src={user.ttd_url} alt="TTD" style={{ width: '50px', height: '50px' }} /></td>
                                                <td>{user.role}</td>
                                                <td>{jurusans.find(j => j.id === user.jurusan_id)?.nama_jurusan}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => showModal(user)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger" onClick={() => showModalDelete(user)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {/* Tampilkan informasi jumlah data yang ditampilkan */}
        <div className='d-flex justify-content-between align-items-center mt-2'>
            <p style={{ fontSize: '14px', color: 'grey' }}>Showing {startIndex} to {endIndex} of {totalData} results</p>
        
                                {/* Pagination */}
            {/* Pagination */}
            <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datapengguna;
