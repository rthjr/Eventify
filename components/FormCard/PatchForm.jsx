'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";   

export default function CategoryForm({api, id, categoryName, createdAt}){
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        async function PATCH() {
        const name = data.name;
        console.log(name)
            try {
            console.log('updating...')
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
            const res = await fetch(`${api}/${id}`, {
                method: 'PUT',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({name: name, updatedAt: formattedDate }),
            });
            if (!res.ok) {
                console.log('Item updated unsuccessfully');
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        }
        PATCH();
        setSubmitted(true);
        reset();
    };
    

    if (submitted) {
        return <p>Category updated successfully!</p>;
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center w-auto h-fit p-12 rounded-lg">
                    <div className="flex flex-col items-center">
                        <label htmlFor="name" className="text-sm mb-2 text-blue-600">change {categoryName} to ...</label>
                        <input id="name" type="text" {...register("name", { required: "Category is required" })} className="bg-white rounded-lg py-2 px-5 border-blue-600 border-[1px]" />
                        {errors.name && <p className="mt-2 mb-2 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <button type="submit" className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 text-sm">Update</button>
                </div>
            </form>
        
        </div>
    );
}