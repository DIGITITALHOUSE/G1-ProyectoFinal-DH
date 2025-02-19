import React from 'react';
import Section from '../Section';
import CardsSwiper from './CardsSwiper';

export const CategoriesAndRecommended = () => {
    return (
        <Section>
            <div>
                <h2 className="text-lg sm:text-2xl font-semibold pb-2">
                    Categorías
                </h2>
                <CardsSwiper />
            </div>
        </Section>
    );
};