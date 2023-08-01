import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, getAllCompanies, getAllCategories } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';
import { addToCart } from '../../Cart/cartSlice';
import { fetchCompanies } from '../productSlice';
import { fetchCategories } from '../productSlice';
import { getAllProducts, selectProduct } from '../productSlice';
import { useAuth } from '../../../components/utils/contents'; 
import ReviewModal from '../../reviews /components/reviewModal';
import { fetchReviewsForProduct, createReviewForProduct, getAllReviews, getUserRatingSummary }  from '../../reviews /reviewSlice';
import RatingStars from 'react-rating-stars-component';



const ProductDetails = () => {
  const selectedProduct = useSelector(getProductDetails) || [];
  const companies = useSelector(getAllCompanies);
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products); 
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviews, setShowReviews] = useState(false);

  
  const isloggedIn = useAuth();

  
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Save cart data to local session storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function handleGoBack() {
    navigate(-1);
  }

  const products = useSelector(getAllProducts);
  const handleOrder = (productId) => {

    if (!selectedProduct[0]) {
      console.log('No product selected');
      return;
    }

    const response = selectedProduct[0]; 
    dispatch(selectProduct(response));
    navigate('/orderform', { state: { product: response } }); 
    console.log(response, 'order, click response');
  };
  

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId.toString());

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const product = selectedProduct[0];

  
  const company = companies.find((c) => c.id === product.company_id) || {};
  
  const category = categories.find((c) => c.id === product.category_id);
  
  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      console.log('Product is already in the cart');
    } else {
      dispatch(addToCart(product));
      console.log(product);
    }
  };

  if (!product || !product.company_id) {
    return <div>Product data is incomplete.</div>;
  }
  

  const reviews = useSelector(getAllReviews) 
  console.log(reviews);


  const fetchReviews = (productId) => {
    dispatch(fetchReviewsForProduct(productId));
  };

  useEffect(() => {
    if (product) {
      fetchReviews(product.id);
    }
  }, [product]);

  const createReview = (productId, review) => {
    dispatch(createReviewForProduct({ productId, review }));
  };


  const user = JSON.parse(sessionStorage.getItem('user'));

  const userId = user ? user.id : null;
  const userName = user ? user.name : null;

  const handleReviewSubmit = () => {
    const review = { 
      user_id: userId,
      rating, 
      review_text: reviewText,
      user_name: userName }
    createReview(product.id,  review);
    setShowReviewModal(false);
    setRating(0);
    setReviewText('');
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const userRatingSummary = useSelector((state) => getUserRatingSummary(state, product.id));


  return (
    <Container>
      <div className='product-detail-container'>
        <h1>Product Details</h1>
        <div key={product.id} className='product-details-container'>
          <div className='product-image'>
            <img src={product.img} alt={product.name} />
          </div>
          <div className='product-data'>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className='company'>
              <h3>Company: 
              <span>{company.name || 'Unknown Company'}</span>               
              </h3>
            </div>
            <div className='category'>
              <h3>Category:
              <span>{category ? category.name : 'Unknown Category'}</span> 
              </h3>
            </div>
            { isloggedIn &&   <button disabled={isInCart(product.id)} onClick={() => handleAddToCart(product)}>Add to Cart</button>}
          
       { isloggedIn && <button onClick={handleOrder}>Order</button> }
            
            <button onClick={handleGoBack} type='button'>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="user-rating-summary">
        <p onClick={() => setShowReviews(!showReviews)}>review</p>
        <RatingStars
          count={5}
          value={ userRatingSummary.toFixed(1) }
          size={24}
          isHalf={true}
          activeColor="#ffd700"
          edit={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
        />
        <p>{userRatingSummary.toFixed(1)}</p>
      </div>

     {showReviews && <div className='reviews'>
        <h3>Reviews:</h3>
        {reviews.map((review) => (
          <div key={review.id}>
            {review.user_name && (
        <p>
          <span className="username-first-letter">{review.user_name.charAt(0).toUpperCase()}</span>
          {review.user_name}
        </p>
      )}
            <RatingStars value={review.rating} />
            <p>{review.review_text}</p>
          </div>
        ))}
        <button onClick={handleShowReviewModal}>Write a Review</button>

      {showReviewModal && (
        <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onReviewSubmit={handleReviewSubmit}
        rating={rating}
        onRatingChange={setRating}
        reviewText={reviewText}
        onReviewTextChange={setReviewText}
        />
        )}
        </div>
      }
    </Container>
  );
};

export default ProductDetails;
