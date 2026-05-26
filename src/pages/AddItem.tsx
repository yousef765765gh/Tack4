import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/api';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import './ItemForm.css';
import { CircleArrowLeft } from 'lucide-react';

const AddItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createItem({ name, price, image });
      navigate('/dashboard/products');
    } catch {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <CircleArrowLeft size={20} />
      </button>

      <h1 className="form-title">ADD NEW ITEM</h1>

      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-left">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter the product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter the product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-right">
          <label>Image</label>
          <ImageUpload preview={preview} onChange={handleImageChange} />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-submit">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;