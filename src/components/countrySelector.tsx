import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { COUNTRIES } from './external/country-picker/lib/countries';
import CountrySelector from './external/country-picker/lib/selector';
import { SelectMenuOption } from './external/country-picker/lib/types';

interface CountryInputProps {
    name?: string;
}

const CountryInput = ({ name = '' }: CountryInputProps) => {
    const [country, setCountry] = useState<SelectMenuOption>({
        title: 'Cyprus',
        value: 'CY',
    });
    const { setValue } = useFormContext();

    const handleCountryChange = (val: SelectMenuOption['value']) => {
        const selectedCountry = COUNTRIES.find(
            (option) => option.value === val
        ) as SelectMenuOption;
        setCountry(selectedCountry);
    };

    useEffect(() => {
        setValue('nationality', country?.title);
    }, [country]);

    return (
        <CountrySelector
            id={'countries'}
            onChange={handleCountryChange}
            selectedValue={country}
        />
    );
};

export default CountryInput;
