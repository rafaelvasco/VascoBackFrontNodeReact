import api from "@/backend/api";
import { FoodProduct } from "@/types/FoodProduct";
import { Order } from "@/types/Order";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";
import Image from "next/image";
import { Ingredient } from "@/types/Ingredient";
import { useReducer } from "react";
import { OrderMap } from "@/types/OrderMap";

type OrderAction =
    | { actionId: "increase"; ingredientId: string }
    | { actionId: "decrease"; ingredientId: string };

const OrderCustom = () => {
    const [availableIngredients, setAvailableIngredients] = useState(null);
    const [productOrder, setProductOrder] = useState(null as Order);

    const orderMapManager = (
        state: OrderMap,
        action: OrderAction
    ): OrderMap => {
        let quantity: number = state[action.ingredientId] ?? 0;

        switch (action.actionId) {
            case "increase":
                return {
                    ...state,
                    [action.ingredientId]: ++quantity,
                };
            case "decrease":
                quantity -= 1;
                if (quantity < 0) {
                    quantity = 0;
                }
                return {
                    ...state,
                    [action.ingredientId]: quantity,
                };
        }
    };

    const [orderMap, dispatchOrderAction] = useReducer(
        orderMapManager,
        {} as OrderMap
    );

    const [loadingValue, setLoadingValue] = useState(false);

    const fetchProductOrder = async () => {
        if (Object.keys(orderMap).length === 0) {
            return;
        }

        setLoadingValue(true);

        try {
            const result = await api.post<Order>("order/total", {
                customIngredients: orderMap,
            });

            console.log(result);

            if (result.status === 200) {
                setProductOrder(result.data);
            }
            setLoadingValue(false);
        } catch (e) {
            toast.error(`An error occurred while generating Order: ${e}`);
        }
    };

    const fetchAvailableIngredients = async () => {
        try {
            const result = await api.get<Array<Ingredient>>("ingredients/all");
            if (result.status === 200) {
                setAvailableIngredients(result.data);
            }
        } catch (e) {
            toast.error(
                `An error occurred while fetching available ingredients: ${e}`
            );
        }
    };

    const handleButtonIncreaseDecreaseClick = (
        action: "increase" | "decrease",
        ingredientId: string
    ) => {
        dispatchOrderAction({
            actionId: action,
            ingredientId: ingredientId,
        });
    };

    useEffect(() => {
        fetchAvailableIngredients();
    }, []);

    useEffect(() => {
        if (Object.keys(orderMap).length > 0) {
            fetchProductOrder();
        }
    }, [orderMap]);

    return (
        <>
            {availableIngredients ? (
                <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
                    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                        <div className="md:flex items-center -mx-10">
                            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                <div className="relative">
                                    <Image
                                        alt="Monte seu Lanche"
                                        src="/static/images/monte.png"
                                        className="lg:h-48 md:h-36 object-cover object-center bg-white"
                                        width={544}
                                        height={306}
                                    />
                                    <div className="border-4 border-yellow-200 absolute top-5 bottom-5 left-5 right-5 z-0"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-10">
                                <div className="mb-10">
                                    <div className="container mb-2 flex mx-auto w-full items-center justify-center">
                                        {availableIngredients ? (
                                            <ul className="flex flex-col p-4">
                                                {availableIngredients.map(
                                                    (
                                                        ingredient: Ingredient
                                                    ) => {
                                                        return (
                                                            <li
                                                                key={
                                                                    ingredient.id
                                                                }
                                                                className="border-yellow-400 flex flex-row"
                                                            >
                                                                <div
                                                                    className={`select-none my-2 flex flex-1 items-center p-4 rounded-2xl border-2 hover:shadow-2xl border-yellow-400`}
                                                                >
                                                                    <div className="flex-1 pl-1 mr-8">
                                                                        <div className="font-medium">
                                                                            {
                                                                                ingredient.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => {
                                                                            handleButtonIncreaseDecreaseClick(
                                                                                "increase",
                                                                                ingredient.id
                                                                            );
                                                                        }}
                                                                        className={`text-wrap text-center flex text-black text-bold flex-col rounded-md bg-yellow-300 justify-center items-center mr-5 p-4`}
                                                                    >
                                                                        +
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            handleButtonIncreaseDecreaseClick(
                                                                                "decrease",
                                                                                ingredient.id
                                                                            );
                                                                        }}
                                                                        className={`text-wrap text-center flex text-black text-bold flex-col rounded-md bg-yellow-300 justify-center items-center mr-5 p-4`}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <div>
                                                                        {orderMap[
                                                                            ingredient
                                                                                .id
                                                                        ] ?? 0}
                                                                        <span>
                                                                            X
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
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
                                    </div>
                                </div>

                                <div>
                                    <div className="inline-block align-bottom mr-10">
                                        <span className="mr-3">
                                            Preço Final:
                                        </span>
                                        <span className="text-2xl leading-none align-baseline">
                                            {loadingValue ? (
                                                <Loader
                                                    type="Puff"
                                                    color="#00BFFF"
                                                    height={25}
                                                    width={25}
                                                    timeout={3000} //3 secs
                                                />
                                            ) : productOrder ? (
                                                productOrder.totalValue
                                                    .formattedAmount
                                            ) : (
                                                <span>R$ 0.00</span>
                                            )}
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

export default OrderCustom;
