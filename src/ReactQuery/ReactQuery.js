import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
// import { axiosInstance } from '../axiosInstance'
import axios from 'axios'

const ReactQuery = () => {
    //we have to write as it isLoading & isError 
    const { isLoading, isError, data, } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            // using fetch method 
            // try {
            //     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            //     const data = await response.json();
            //     return data;
            // } catch (error) {
            //     console.log(error.message);
            //     throw new Error("Failed to fetch data");
            // }

            // using axios method 

            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                // console.log(response.data);
                return response.data

            } catch (error) {
                console.log("-=-=-", error.message);
                throw new Error("Failed to fetch data");

            }
        }
    })

    if (isLoading) return <>loading...</>
    if (isError) return <>error + {isError.message}</>

    return (
        <>
            <div>
                <h1>Hello</h1>
                {console.log(data)}

                {data.map((product, index) => (
                    <div key={index}>
                        <p>{product.title}</p>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ReactQuery