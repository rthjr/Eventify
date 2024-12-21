import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CategoryForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        const Category = JSON.parse(localStorage.getItem("categories")) || [];
        const newCategory = { ...data, createdAt: new Date().toISOString() };
        Category.push(newCategory);
        localStorage.setItem("categories", JSON.stringify(Category));
        setSubmitted(true);
        reset();
    };

    if (submitted) {
        return <p>Category added successfully!</p>;
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center w-auto h-fit p-12 rounded-lg">
                <div className="flex flex-col items-center">
                    <label htmlFor="name" className="text-sm mb-2 text-blue-600">Category Name</label>
                    <input id="name" type="text" {...register("name", { required: "Category is required" })} className="bg-white rounded-lg py-2 px-5 border-blue-600 border-[1px]" />
                    {errors.name && <p className="mt-2 mb-2 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <button type="submit" className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 text-sm">Create</button>
            </div>
        </form>
    </div>
    );
}
