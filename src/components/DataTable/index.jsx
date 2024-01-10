import React, { useState, useMemo } from 'react';
import { Switch, Pagination } from 'antd';
import "./dataTable.css";

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [currentPage, pageSize, data]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = e.target.value.trim() === '' ? '' : parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      setPageSize(newSize);
    }
  };

  const totalEntries = data.length;

  return (
    <div className='responsive-container'>
      <div>
        Showing
        <input
          type="text"
          className='mx-2'
          style={{ width: "50px", height: "30px" }}
          value={pageSize === '' ? '' : pageSize}
          onChange={handlePageSizeChange}
        />
        entries
      </div>
      <div className='table-container'>
        <table className='container'>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Interview</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white' }}>
                <td>{index}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.profilePhotoURL}  style={{ width: "50px", height: "30px", borderRadius: "50%" }} alt="Profile" />
                  <span className='ms-2'>{user.username}</span>
                </td>
                <td>{user.phone}</td>
                <td>{user.interviewTime}</td>
                <td>{user.role}</td>
                <td>
                  <Switch
                    checked={user.check}
                    backgroundColor="#000000"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='container row justify-content-between mt-4 pb-3'>
        <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
          <p>Showing 1 to {pageSize === '' ? '' : pageSize} of {totalEntries} entries</p>
        </div>
        <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
          <Pagination
            itemBg="#000000"
            current={currentPage}
            onChange={handlePageChange}
            total={totalEntries}
            pageSize={pageSize === '' ? 5 : pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
