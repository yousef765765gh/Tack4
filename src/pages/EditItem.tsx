import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItem, updateItem } from '../services/api';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import './ItemForm.css';
import { CircleArrowLeft } from 'lucide-react';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItem(Number(id));
        setName(data.name || '');
        setPrice(data.price || '');
        setPreview(data.image_url || null);
      } catch {
        navigate('/dashboard/products');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateItem(Number(id), { name, price, image });
      navigate('/dashboard/products');
    } catch {
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="form-loading">Loading...</div>;

  return (
    <div className="item-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <CircleArrowLeft size={20} />
      </button>

      <h1 className="form-title">EDIT ITEM</h1>

      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-left">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
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

export default EditItem;