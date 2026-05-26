import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import AuthLayout from '../components/AuthLayout';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard/products');
      } else {
        setError('Invalid credentials');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="SIGN IN"
      subtitle="Enter your credentials to access your account"
      switchText="Don't have an account?"
      switchLink="/signup"
      switchLinkText="Create one"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label>Password</label>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;