import React from 'react';

const FormInput = ({ field, type, value, onChange, totalFields, options = [], imagePreview, views = 1 ,fullCol }) => {
  const label = field.replace(/[_-]/g, ' ').replace(/id$/i, '').replace(/\b\w/g, c => c.toUpperCase());

  let colMd = 6;
  let colLg = 6;

  // Logic khusus untuk image
  const isImageUpload = type === 'file' && /(cover|image)/i.test(field);
  if (isImageUpload) {
    colMd = 6;
    colLg = 3;
  } else if (type === 'textarea') {
    colMd = 12;
    colLg = 12;
  } else if (fullCol) {
    colMd = 12;
    colLg = 12;
  }

  return (
    <>
      {isImageUpload ? (
        <>
          <div className='col-md-4 col-lg-4'>
            <div className='col-lg-12 col-md-12'>
              <div className="form-group">
                <label className="form-label text-center">{label}</label>
                <img
                  src={imagePreview || '/img/comics/default.jpg'}
                  alt={label}
                  className="cover__anime img-fluid mb-2"
                />
                <input
                  type="file"
                  className="form-control"
                  accept="image/png, image/gif, image/jpeg"
                  name={field}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {type === 'textarea' ? (

            <div className={`col-md-${colMd} col-lg-${colLg}`}>
              <div className="form-group">
                <label className="form-label">{label}</label>
                <textarea
                  className="form-control"
                  name={field}
                  rows="3"
                  value={value}
                  onChange={onChange}
                />
              </div>
            </div>
          ) : options?.length > 0 ? (
            <div className={`col-md-${colMd} col-lg-${colLg}`}>
              <div className="form-group">
                <label className="form-label">{label}</label>
                <select
                  className="form-control"
                  name={field}
                  value={value}
                  onChange={onChange}
                >
                  <option value="" disabled>-- Pilih {label}</option>
                  {options.map((row, i) => (
                    <option key={i} value={row}>
                      {row.charAt(0).toUpperCase() + row.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className={`col-md-${colMd} col-lg-${colLg}`}>
              <div className="form-group">
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-control"
                  name={field}
                  value={type === 'password' ? '' : value}
                  step={type === 'number' ? '0.001' : undefined}
                  onChange={onChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FormInput;
