import React from 'react';
import Section from '../Section';
import CardsSwiper from './CardsSwiper';

export const CategoriesAndRecommended = () => {
    return (
        <Section>
            <div className="px-4">
                <h2 className="text-xl font-semibold mb-8">
                    Elige las categorías que te interesan
                </h2>
                <CardsSwiper />
            </div>
        </Section>
    );
};