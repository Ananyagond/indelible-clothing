import { useContext } from 'react';

import { ProductsContext } from '../../context/products.context';
import ProductCard  from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
    const { products } = useContext(ProductsContext);
    //console.log('Products:', products); 

    return (
        <div className='products-container'>
            {products && products.filter(product => product && product.id).map(product => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Shop;
