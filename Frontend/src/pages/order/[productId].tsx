import api from "@/backend/api";
import { FoodProduct } from "@/types/FoodProduct";
import { Order } from "@/types/Order";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";
import Image from "next/image";

const OrderMenu = () => {
    const router = useRouter();

    const { productId } = router.query;

    const [product, setProduct] = useState(null);
    const [productOrder, setProductOrder] = useState(null);

    const fetchProductOrder = async () => {
        try {
            const result = await api.post<Order>("order/total", {
                menuId: productId,
            });
            if (result.status === 200) {
                setProductOrder(result.data);
            }
        } catch (e) {
            toast.error(`An error occurred while generating Order: ${e}`);
        }
    };

    const fetchProduct = async () => {
        try {
            const result = await api.get<FoodProduct>("products", {
                params: {
                    id: productId,
                },
            });

            if (result.status === 200) {
                setProduct(result.data);
                await fetchProductOrder();
            }
        } catch (e) {}
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            {productOrder ? (
                <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
                    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                        <div className="md:flex items-center -mx-10">
                            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                <div className="relative">
                                    <Image
                                        alt={product.name}
                                        src={`/static/images/${product.name}.png`}
                                        className="lg:h-48 md:h-36 object-cover object-center bg-white"
                                        width={544}
                                        height={306}
                                    />
                                    <div className="border-4 border-yellow-200 absolute top-5 bottom-5 left-5 right-5 z-0"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-10">
                                <div className="mb-10">
                                    <h1 className="font-bold uppercase text-2xl mb-5">
                                        {product.name}
                                    </h1>
                                </div>
                                <div>
                                    <div className="inline-block align-bottom mr-5">
                                        <span className="mr-3">
                                            Preço Final:
                                        </span>
                                        <span className="text-2xl leading-none align-baseline">
                                            {
                                                productOrder.totalValue
                                                    .formattedAmount
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
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
    );
};

export default OrderMenu;
