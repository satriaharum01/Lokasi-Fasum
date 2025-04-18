import React, { useEffect, useState } from 'react';
import Api from '../api';
import FormInput from './FormInput';

const DynamicForm = ({ formPage, valID, formData, setFormData }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schema, setSchema] = useState({ fillable: [], fieldTypes: {} });
    const IMAGE_BASE_URL = "http://localhost:8000/img/fasum/";

    const fieldOptions = {
        status: ['ongoing', 'completed'],
        // tambahin sesuai kebutuhan
    };

    useEffect(() => {
        const fetchSchema = async () => {
            try {
                const response = await Api.get(`/form-schema/${formPage}`);
                const { fillable, fieldTypes } = response.data;
                const initialData = {};

                fillable.forEach((field) => {
                    initialData[field] = '';
                });

                setSchema({ fillable, fieldTypes });
                setFormData(initialData);

                // Kalau valID ada, fetch data buat edit
                if (valID) {
                    const res = await Api.get(`/${formPage}/find/${valID}`);
                    setFormData((prev) => ({
                        ...prev,
                        ...res.data,
                    }));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchema();
    }, [formPage, valID]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0], // ini file aslinya
                [`${name}_preview`]: URL.createObjectURL(files[0]), // ini buat preview di img tag
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

    };


    const hasFileImageField = Object.entries(schema.fieldTypes).some(
        ([field, type]) => type === 'file' && /(cover|image)/i.test(field)
    );

    return (
        <>
            {/* Bagian khusus gambar (row pertama) */}
            {schema.fillable
                .filter(
                    (field) =>
                        schema.fieldTypes[field] === 'file' &&
                        /(cover|image)/i.test(field)
                )
                .map((field, i) => (
                    <FormInput
                        key={i}
                        field={field}
                        type={schema.fieldTypes[field]}
                        value={formData[field] || ''}
                        imagePreview={
                            field === 'cover_image'
                                ? formData[field] instanceof File
                                    ? URL.createObjectURL(formData[field])
                                    : `${IMAGE_BASE_URL}${formData[field]}`
                                : formData[`${field}_preview`]
                        }
                        totalFields={schema.fieldTypes.length}
                        options={fieldOptions[field]}
                        onChange={handleChange}
                        fullCol={true}
                    />
                ))}

            {/* Form baris kedua */}
            <div className={`${hasFileImageField ? 'col' : 'row col-12'}`}>
                {Object.entries(schema.fieldTypes)
                    .filter(
                        ([field, type]) =>
                            !(type === 'file' && /(cover|image)/i.test(field))
                    )
                    .map(([field, type], i) => (
                        <FormInput
                            key={i}
                            field={field}
                            type={type || 'text'}
                            value={formData[field] || ''}
                            totalFields={schema.fieldTypes.length}
                            options={fieldOptions[field]}
                            onChange={handleChange}
                            fullCol={hasFileImageField}
                        />
                    ))}
            </div>
        </>
    );
};

export default DynamicForm;
