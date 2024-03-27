import React, { useState } from 'react';
import ViewListItems from './ViewListItems';
import { Button, Input, Checkbox } from '@nextui-org/react';

export default function ListItems() {

    const [form, setForm] = useState({
        itemName: '',
        volume: '',
        qty: '',
        src: '',
        buttonStatus: false,
        addButton: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would send the data to the backend using fetch or axios
        // Example using fetch:
        fetch('http://localhost:4001/api/items/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Reset form or give feedback to the user
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <h1>ListItems</h1>
            <div >
                <form onSubmit={handleSubmit} className='flex flex-row w-1/2 gap-5 mx-auto'>
                    <Input
                        variant="bordered"
                        name="itemName"
                        type="text"
                        placeholder="Item Name"
                        value={form.itemName}
                        onChange={handleChange}
                    />
                      <Input
                        variant="bordered"
                        name="volume"
                        type="number"
                        placeholder="Volume"
                        value={form.volume}
                        onChange={handleChange}
                    />
                      <Input
                        variant="bordered"
                        name="qty"
                        type="number"
                        placeholder="Quantity"
                        value={form.qty}
                        onChange={handleChange}
                    />
                      <Input
                        variant="bordered"
                        name="src"
                        type="text"
                        placeholder="Image Source URL"
                        value={form.src}
                        onChange={handleChange}
                    />
                    <label>
                        Button Status:
                        <Checkbox
                            name="buttonStatus"
                            type="checkbox"
                            checked={form.buttonStatus}
                            onChange={handleChange}
                        > True</Checkbox> 
                    </label>
                    <label>
                        Add Button:
                        <Checkbox
                            name="addButton"
                            type="checkbox"
                            checked={form.addButton}
                            onChange={handleChange}
                    >True</Checkbox>
                    </label>
                    <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" type="submit">Add Item</Button>
                </form>
            </div>
            <ViewListItems />
        </div>
    )
}
