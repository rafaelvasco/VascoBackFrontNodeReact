import { FoodProduct } from "@/types/FoodProduct";
import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = {
    product?: FoodProduct | null;
    customLabel?: string;
};

export const ProductCard = (props: ProductCardProps) => {
    return (
        <div
            className="relative cursor-pointer p-4 md:w-1/2 md"
            style={{ maxWidth: "544px" }}
        >
            <div className="h-full border-2 border-gray-200 bg-gray-100 border-opacity-60 dark:border-gray-800 dark:bg-gray-800 rounded-md overflow-hidden transition-colors">
                <Link
                    href={
                        props.product
                            ? `order/${props.product?.id}`
                            : "order/custom"
                    }
                >
                    <a>
                        <Image
                            alt={
                                props.product?.name ??
                                props.customLabel ??
                                "Monte o Seu"
                            }
                            src={`/static/images/${
                                props.product?.name ?? "monte"
                            }.png`}
                            className="lg:h-48 md:h-36 object-cover object-center bg-white"
                            width={544}
                            height={306}
                        />
                    </a>
                </Link>

                <div className="p-6">
                    <h2 className="text-2xl font-bold leading-8 tracking-tight mb-3">
                        {props.product?.name ??
                            props.customLabel ??
                            "Monte o Seu"}
                    </h2>
                    <p className="text-2xl font-bold leading-8 p-3 text-right tracking-tight mb-3 bg-black text-white">
                        {props.product ? "Preço Base:   " : null}

                        {props.product?.value.formattedAmount ?? null}
                    </p>
                </div>
            </div>
        </div>
    );
};
