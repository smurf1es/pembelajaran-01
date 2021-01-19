import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [name, setNama] = useState('');
  const [absen, setAbsen] = useState('');
  const [kelas, setKelas] = useState('');
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [paramsEdit, setParamsEdit] = useState(null);

  useEffect(() => {
    _getDatas();
  }, []);

  async function _getDatas() {
    const { data: dataProps } = await axios.get('http://localhost:5000/api/huger');
    setData(dataProps);
  };

  const _tambahHandler = async () => {
    await axios.post('http://localhost:5000/api/huger', {
      name,
      absen,
      kelas
    });
    setNama('');
    setKelas('');
    setAbsen('');
  };

  const _updateHandler = async () => {
    await axios.put(`http://localhost:5000/api/huger/${paramsEdit}`, {
      name,
      absen,
      kelas
    });
    setNama('');
    setKelas('');
    setAbsen('');
    setEdit(false);
    setParamsEdit(null);
  };

  const _deleteHandler = async (no_absen) => {
    await axios.delete(`http://localhost:5000/api/huger/${no_absen}`);
  };

  const _activateEdit = (data) => {
    setNama(data.name);
    setAbsen(data.absen);
    setKelas(data.kelas);
    setEdit(true);
    setParamsEdit(Number(data.absen));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center mt-6 mb-12">
        <label className="font-bold mr-2" htmlFor="nama">Nama</label>
        <input
          className="mr-2 px-1 focus:outline-none"
          placeholder="Masukkan Nama"
          type="text"
          onChange={(e) => setNama(e.target.value)}
          value={name}
        />
        <label className="font-bold mr-2" htmlFor="absen">Absen</label>
        <input
          className="mr-2 px-1 focus:outline-none"
          placeholder="Masukkan Absen"
          type="text"
          onChange={(e) => setAbsen(e.target.value)}
          value={absen}
        />
        <label className="font-bold mr-2" htmlFor="kelas">Kelas</label>
        <input
          className="mr-2 px-1 focus:outline-none"
          placeholder="Masukkan Kelas"
          type="text"
          onChange={(e) => setKelas(e.target.value)}
          value={kelas}
        />
        <button 
          className="mr-2 bg-green-700 text-white py-2 px-5"
          onClick={_tambahHandler}>
            Tambah
        </button>
        {edit && (
          <button 
            className="bg-yellow-700 text-white py-2 px-4"
            onClick={_updateHandler}>
              Edit
          </button>
        )}
      </div>
      <>
        <table className="table-auto border-separate">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Absen</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {data && data.map((dt, idx) => (
            <tbody key={idx} className="text-center">
              <tr>
                <td>{dt.name}</td>
                <td>{dt.kelas}</td>
                <td>{dt.absen}</td>
                <td>
                <button 
                  className="bg-yellow-700 mr-2 text-white py-0.5 px-2"
                  onClick={() => _activateEdit(dt)}>
                    Edit
                </button>
                <button 
                  className="bg-red-700 text-white py-0.5 px-2"
                  onClick={() => _deleteHandler(dt.absen)}>
                    Hapus
                </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </>
    </div>
  )
}

export default HomeScreen;
