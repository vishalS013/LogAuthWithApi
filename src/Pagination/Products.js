import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../Pagination/AxiosInstance';
import { Card } from 'react-bootstrap';

function Products() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page
    const totalPages = 5; // Total number of pages

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/products');
            setData(response.data.products);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems,"currentItems")

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    // console.log("paginate -=-=-=-=" );

    const handlePrevious = (e) => {
        setCurrentPage(currentPage - 1)
        console.log("previous ", currentPage);
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        console.log("next page", currentPage);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // For displaying three different kind of shadows

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

                {currentItems.map((item, index) => (
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
            <div className="mt-4 flex justify-center">
                <ul className="flex">

                    <button onClick={handlePrevious} disabled={currentPage === 1}
                        className={`mx-1 px-3 py-1 cursor-pointer ${currentPage === 1 ? 'bg-white-900 text-blue-500' : 'bg-gray-300 text-gray-900'
                            }`}
                    >Previous </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        < li
                            key={i}
                            className={`mx-1 px-3 py-1 cursor-pointer ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
                                }`}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </li>
                    ))}
                    <button onClick={handleNext}
                        className={`mx-1 px-3 py-1 cursor-pointer ${currentPage === totalPages ? 'bg-white-900 text-blue-500' : 'bg-gray-300 text-gray-900'
                            }`}
                        disabled={currentPage === totalPages}
                    >Next </button>
                </ul>
            </div>
        </div >
    );
}

export default Products;
