export const FormField = ({ label, type = 'text', value, onChange, placeholder, required, error, rows, className = '' }) => {
    const inputClasses = `form-input ${error ? 'error' : ''} ${className}`;

    return (
        <div className="form-field">
            {label && (
                <label className="form-label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    rows={rows || 4}
                    className={inputClasses}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className={inputClasses}
                />
            )}

            {error && <span className="form-error">{error}</span>}
        </div>
    );
};
