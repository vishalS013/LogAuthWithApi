import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../Pagination/AxiosInstance';
import { Card } from 'react-bootstrap';

function Products() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
                const response = await axiosInstance.get('/products');
                setData(response.data.products);
                console.log("-=-=-=-=->", response.data.products);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

  useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function getShadowClass(index) {
        switch (index % 3) {
          case 0:
            return 'shadow-sm ring-offset-green-300';
          case 1:
            return 'shadow-md ring-offset-blue-300';
          case 2:
            return 'shadow-lg ring-offset-purple-300';
          default:
            return 'shadow';
        }
      }
      

    return (
        <div>
            <div className='sticky z-10 inset-x-0 top-0 flex justify-center bg-slate-800 '>
  <h1 className='text-center text-white'>All Products</h1>
</div>

            <div className='flex flex-wrap w-full space-x-0 '>
  {data.map((item, index) => (
    <div key={index} className='w-1/3 h-2/4  p-2 '>
      <Card className={`flex flex-col h-1/2 border-none ${getShadowClass(index)}`}  >
        <div className='h-60 overflow-hidden w-72 ml-20 '>
          <Card.Img variant="top" src={item.images[0]} className=' transition-transform duration-300 transform hover:scale-105 mt-1' />
        </div>
        <Card.Body className='h-48 '>
          <div>
            <Card.Title className='hover:text-red-600 text-orange-800  '>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Title>₹:{item.price}</Card.Title>
          </div>
        </Card.Body>
      </Card>
      <div className='  mt-2 flex justify-between mx-2'> 
            <button className='w-48 h-10 border text-white text-lg bg-teal-800  hover:bg-blue-700 hover:text-orange-700'>Add To Cart</button>
            <button className='w-48 h-10 border bg-orange-500 text-lg text-white  hover:bg-fuchsia-700 hover:text-white-800'>Buy Now</button>
      </div>

     
    </div>
  ))}
</div>


        </div>
    );
}

export default Products;
