import { createContext, useState } from "react";

export const SunglassesContext = createContext();

export const SunglassesProvider = ({ children }) => {
    const [sunglasses, setSunglasses] = useState([]);
    const [cart, setCart] = useState([]);

    const addSunglasses = (sunglassesData) => {
        setSunglasses(state => {
            const index = state.findIndex(sunglasses => sunglasses._id === sunglassesData._id);

            if (index !== -1) {
                state[index] = sunglassesData;
                return [...state];
            } else {
                return [...state, sunglassesData];
            }
        });
    }

    const removeOne = (sunglassesData) => { setSunglasses((state) => state.filter((sunglasses) => sunglasses !== sunglassesData)); };

    const getOne = (sunglassesId) => sunglasses.find(x => x._id === sunglassesId) || {};

    const addToCart = (sunglassesData) => {
        return setCart((state) => {
            const sunglassesIndex = state.findIndex((x) => x.brand === sunglassesData.brand);

            if (sunglassesIndex !== -1) {
                const updatedSunglasses = state.map((sunglasses, index) => {
                    if (index === sunglassesIndex) {
                        return {
                            ...sunglasses,
                            price: Number(sunglasses.price) + Number(sunglassesData.price),
                            quantity: sunglasses.quantity ? sunglasses.quantity += 1 : 1,
                        };
                    }
                    return sunglasses;
                });

                return updatedSunglasses;
            } else {
                return [...state, { ...sunglassesData, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (sunglassesData) => {
        return setCart(state => state.filter(x => x.brand !== sunglassesData.brand));
    };

    return (
        <SunglassesContext.Provider
            value={{
                sunglasses,
                setSunglasses,
                addSunglasses,
                removeOne,
                getOne,
                addToCart,
                removeFromCart,
                cart
            }}
        >
            {children}
        </SunglassesContext.Provider>
    );
};
