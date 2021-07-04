import api from "@/backend/api";
import { useFetch } from "@/backend/requestHooks";
import { SectionContainer } from "@/components/SectionContainer";
import { Mutator } from "@/types/Mutator";
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

const Admin = () => {
    const [mutatorsList, setMutatorsList] = useState([] as Array<Mutator>);

    useEffect(() => {
        fetchMutators();
    }, []);

    const fetchMutators = async () => {
        try {
            const result = await api.get<Array<Mutator>>("mutators");
            if (result.status === 200) {
                setMutatorsList(result.data);
            }
        } catch (e) {
            toast.error(`An error occurred while fetching products: ${e}`);
        }
    };

    const toggleMutator = async (mutator: Mutator) => {
        try {
            mutator.active = !mutator.active;
            const result = await api.post("mutators/update", mutator);
            if (result.status === 200) {
                fetchMutators();
            }
        } catch (e) {
            toast.error(`An error occurred while updating Food Product: ${e}`);
        }
    };

    return (
        <>
            <SectionContainer>
                <div className="my-7">
                    <h1 className="text-center text-2xl">
                        Controle de Promoções
                    </h1>

                    <div className="container mb-2 flex mx-auto w-full items-center justify-center">
                        {mutatorsList ? (
                            <ul className="flex flex-col p-4">
                                {mutatorsList.map((mutator) => {
                                    return (
                                        <li
                                            key={mutator.id}
                                            className="border-gray-400 flex flex-row"
                                        >
                                            <div
                                                className={`select-none my-2 flex flex-1 items-center p-4 rounded-2xl border-2 hover:shadow-2xl border-${
                                                    mutator.active
                                                        ? "green"
                                                        : "red"
                                                }-400`}
                                            >
                                                <div className="flex-1 pl-1 mr-16">
                                                    <div className="font-medium">
                                                        {mutator.name}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        await toggleMutator(
                                                            mutator
                                                        );
                                                    }}
                                                    className={`text-wrap text-center flex text-white text-bold flex-col rounded-md bg-${
                                                        mutator.active
                                                            ? "green"
                                                            : "red"
                                                    }-500 justify-center items-center mr-10 p-2`}
                                                >
                                                    {mutator.active
                                                        ? "Deactivate"
                                                        : "Activate"}
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
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
            </SectionContainer>
        </>
    );
};

export default Admin;
