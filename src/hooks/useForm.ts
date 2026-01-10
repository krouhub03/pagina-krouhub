//  # Manejo de formularios
import { useState } from 'react';

interface FormValues {
    [key: string]: string;
}

export function useForm(initialValues: FormValues) {
    const [values, setValues] = useState<FormValues>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return { values, handleChange };
}
