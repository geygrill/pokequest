import './Button.css';

function Button({ variant = 'primary', size = 'md', rounded = false, fullWidth = false, className = '', children, ...props }) {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        rounded && 'btn--rounded',
        fullWidth && 'btn--full',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default Button;