import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { UploadCloud } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await register({
        ...form,
        user_name: `${form.first_name}_${form.last_name}`,
        profile_image: profileImage,
      });
      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard/products');
      } else {
        setError('Registration failed');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="SIGN UP"
      subtitle="Fill in the following fields to create an account."
      switchText="Do you have an account?"
      switchLink="/"
      switchLinkText="Sign In"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name</label>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Email</label>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <label>Password</label>
        <div className="form-row">
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Re-enter your password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Profile Image</label>
        <div className="form-group">
          <div
            className="profile-upload-box"
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {profilePreview ? (
              <img src={profilePreview} alt="Profile" className="profile-preview" />
            ) : (
              <img src="/assets/img/Upload icon.png" alt="" className='icon-pro'/>
            )}
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;