import '../pages/Auth.css';

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    switchText: string;
    switchLink: string;
    switchLinkText: string;
}

const AuthLayout = ({
    title,
    subtitle,
    children,
    switchText,
    switchLink,
    switchLinkText,
}: AuthLayoutProps) => {
    return (
        <div className="auth-page">
        <div className="auth-card">
            <div className="auth-logo">
            <img src="/assets/img/Logo (1).png" alt="" />
            </div>
            <h1 className="auth-title">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>

            {children}

            <p className="auth-switch">
            {switchText}{' '}
            <a href={switchLink}>{switchLinkText}</a>
            </p>
        </div>
        </div>
    );
};

export default AuthLayout;