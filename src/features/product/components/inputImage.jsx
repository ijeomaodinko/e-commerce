import React, { useState } from 'react';
import './inputImage.css';

const InputImage = ({ register, setValue }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);
        setValue('img', objectUrl);
    }
  };

  const handleUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setValue('img', url);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setValue('img', ''); 
  };

  return (
    <div className='input-image'>
      <label className='img'  htmlFor='img'>Upload </label>
      <input
        type='file'
        id='img'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleImageChange}
        />
        {imageUrl && (
          <div className='image-preview'>
            <img src={imageUrl} className='preview-img' alt='Preview' />
            <button className='previewbtn' type='button' onClick={handleRemoveImage}>Remove Image</button>
          </div>
        )}
      <input
        type='text'
        name='img'
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder='Paste image URL or click to upload from local machine'
      />
    </div>
  );
};

export default InputImage;
