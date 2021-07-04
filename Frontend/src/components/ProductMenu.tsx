import { useFetch } from '@/backend/requestHooks'
import { FoodProduct } from '@/types/FoodProduct'
import { useEffect } from 'react'
import Loader from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { ProductCard } from './ProductCard'

export const ProductMenu = () => {

    const [productList, errorProductList] = useFetch<Array<FoodProduct>>('products/menu')

    useEffect(() => {
        if (errorProductList) {
            toast.error(`An error ocurred while loading Products: ${errorProductList}`)
        }
    }, [errorProductList])

    return (
        <>
            {productList ? (
                <div>
                    <div className="py-12">
                        <div className="flex flex-wrap justify-center">
                            {productList.length > 0 ? (
                                productList.map((product) => <ProductCard key={product.id} product={product} />)
                            ) : (
                                <h2>No Available Products</h2>
                            )}
                            <ProductCard key="9999" customLabel="Monte o Seu"/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12">
                    <div className="flex flex-wrap justify-center">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                    </div>
                </div>
            )}
        </>
    )
}
