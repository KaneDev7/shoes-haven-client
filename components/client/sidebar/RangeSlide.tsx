"use client";

import { setQueryParams } from '@/redux/domains/products/queryParams.slice';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

const RangeSlider: React.FC = () => {
    const [minPrice, setMinPrice] = useState<number>(5000);
    const [maxPrice, setMaxPrice] = useState<number>(20000);
    const minRangeRef = useRef<HTMLInputElement>(null);
    const maxRangeRef = useRef<HTMLInputElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()

    const priceGap = 500;

    useEffect(() => {
        const handlePriceInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const minPriceValue = parseInt((document.querySelector('.input-min') as HTMLInputElement).value);
            const maxPriceValue = parseInt((document.querySelector('.input-max') as HTMLInputElement).value);

            if (maxPriceValue - minPriceValue >= priceGap) {
                if (target.className === 'input-min') {
                    setMinPrice(minPriceValue);
                    if (minRangeRef.current && progressRef.current) {
                        minRangeRef.current.value = minPriceValue.toString();
                        progressRef.current.style.left = ((minPriceValue / parseInt(minRangeRef.current.max)) * 100) + '%';
                    }
                } else {
                    setMaxPrice(maxPriceValue);
                    if (maxRangeRef.current && progressRef.current) {
                        maxRangeRef.current.value = maxPriceValue.toString();
                        progressRef.current.style.right = 100 - (maxPriceValue / parseInt(maxRangeRef.current.max)) * 100 + '%';
                    }
                }
            }
        };

        const priceInputs = document.querySelectorAll('.price-input input');
        priceInputs.forEach(input => {
            input.addEventListener('input', handlePriceInput);
        });

        return () => {
            priceInputs.forEach(input => {
                input.removeEventListener('input', handlePriceInput);
            });
        };
    }, []);

    useEffect(() => {
        const handleRangeInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const minVal = parseInt((document.querySelector('.range-min') as HTMLInputElement).value);
            const maxVal = parseInt((document.querySelector('.range-max') as HTMLInputElement).value);

            if ((maxVal - minVal) < priceGap) {
                if (target.className === 'range-min') {
                    if (minRangeRef.current) {
                        minRangeRef.current.value = (maxVal - priceGap).toString();
                    }
                } else {
                    if (maxRangeRef.current) {
                        maxRangeRef.current.value = (minVal + priceGap).toString();
                    }
                }
            } else {
                setMinPrice(minVal);
                setMaxPrice(maxVal);
                if (progressRef.current) {
                    progressRef.current.style.left = ((minVal / parseInt(minRangeRef.current?.max || '5000')) * 100) + '%';
                    progressRef.current.style.right = 100 - ((maxVal / parseInt(maxRangeRef.current?.max || '20000')) * 100) + '%';
                }
            }
        };

        const handleFetch = () => {
            const minVal = parseInt((document.querySelector('.range-min') as HTMLInputElement).value);
            const maxVal = parseInt((document.querySelector('.range-max') as HTMLInputElement).value);

            dispatch(setQueryParams(['price_lte', maxVal.toString()]))
            dispatch(setQueryParams(['price_gte', minVal.toString()]))
        }

        const rangeInputs = document.querySelectorAll('.range-input input');
        rangeInputs.forEach(input => {
            input.addEventListener('input', handleRangeInput);
            input.addEventListener('change', handleFetch);
        });

        return () => {
            rangeInputs.forEach(input => {
                input.removeEventListener('input', handleRangeInput);
                input.removeEventListener('change', handleFetch);
            });
        };

    }, [minPrice, maxPrice]);

    return (
        <div className="wrapper">

            <div className="slider">
                <div ref={progressRef} className="progress"></div>
            </div>
            <div className="range-input">
                <input
                    type="range"
                    className="range-min"
                    min="500"
                    max="50000"
                    value={minPrice}
                    step="100"
                    ref={minRangeRef}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <input
                    type="range"
                    className="range-max"
                    min="500"
                    max="50000"
                    value={maxPrice}
                    step="100"
                    ref={maxRangeRef}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
            </div>
            <div className='flex items-center gap-5 mt-7 text-sm'>
                <p>Range : </p>
                <p className='font-semibold'> {`${minPrice} FCFA - ${maxPrice} FCFA `} </p>
            </div>
        </div>
    );
};

export default RangeSlider;
