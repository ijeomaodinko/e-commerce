import React, { useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './product.css';
import { createProduct, fetchCompanies, fetchCategories, getAllCompanies, getAllCategories, getProductStatus, getProductError} from '../productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleToast } from '../../../components/utils/contents';
import Container from '../../../components/Container';

const productSchema = yup.object().shape({
    name: yup.string().required().min(3, 'Name must be at least 3 characters'),
    img: yup.string().required(),
    description: yup.string().required().min(3, 'description must be at least 3 characters'),
    company_id: yup.number().required(),
    category_id: yup.number().required(),
    price: yup.number().required(),
})

function ProductForm() {

    const dispatch = useDispatch();
    const error = useSelector(getProductError);
    const status = useSelector(getProductStatus);
    const categories = useSelector(getAllCategories);
    const companies = useSelector(getAllCompanies);

    useEffect(() =>{
        if (status === 'idle'){
            dispatch(fetchCategories());
            dispatch(fetchCompanies());
        }
    }, [status, dispatch]);

    const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(productSchema)
    });

const onSubmit = (product) => {
    dispatch(createProduct(product));
    console.log(product);
};

if (status === 'loaading'){
    return <div> Loading...</div>;
}
if (status === 'error'){
    return <div>{error}</div>
}
  return (
    <Container>
        <ToastContainer />
    <div className='product-container'>
        <h2> Add Product</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Name: </label>
        <input type="text" name="name" {...register('name')} />
        {errors.name && <p> {errors.name.message} </p>}

        <label htmlFor='img'> Image: </label>
        <input type="text" name="img" {...register('img')} />
        {errors.img && <p> { errors.img.message }</p>}

        <label htmlFor='description'>Description: </label>
        <input type="text" name="description" {...register('description')} />
        {errors.description && <p>{errors.description.message}</p>}

        <label htmlFor='category_id'>Category: </label>
        <select name="category_id" {...register('category_id')}>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
        {errors.category_id  && <p>{errors.category_id.message}</p>}

        <label htmlFor='company_id'> Company: </label>
        <select name="company_id" {...register('company_id')}>
            {companies.map((company) => (
                <option key={company.id} value={company.id}>
                    {company.name}
                </option>
            ))}
        </select>
        {errors.company_id  && <p>{errors.company_id.message}</p>}
    
    <label htmlFor='price'>Price: </label>
    <input type="number" name="price" {...register('price')} />
    {errors.price && <p> {errors.price.message}</p>}

    <button type="submit">Submit</button>
    
    </form>
      
    </div>
    </Container>
  )
}

export default ProductForm
