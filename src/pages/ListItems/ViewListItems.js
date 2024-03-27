import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button
} from "@nextui-org/react";

export default function ViewListItems() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4005/api/items');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4005/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Fetching error: ", error);
    }
   }


  return (
    <div>
      <h1>ViewListItemsXC </h1>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Item Name</TableColumn>
          <TableColumn>Pic</TableColumn>
          <TableColumn>Volume</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {

            return (
              <TableRow key={index}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>
                  {/* Conditionally render the icon if it exists */}
                  <i className={item.src}></i>
                </TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell><Button value={item.id} onClick={handleDelete((e) => e.target.value)}>X</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
